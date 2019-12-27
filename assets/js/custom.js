document.addEventListener("DOMContentLoaded", () => {
    var page = window.location.hash.substr(1);
    let deep = page.split('/')

    if (deep.length > 1 && deep[1] != '') {
        //router
        let first = deep[0]
        switch (first) {
            case 'standings':
                RouterStanding(deep[1])
                break
            default:
                RouterError()
        }
    } else {
        if (page == '') {
            page = 'home'
        }
        route(page);
    }

    setMaterialize()

    navListener()

    btnSettingsListener()

    colorPlateListener()

});

const route = (page) => {

    urlPage = "pages/" + page + ".html";

    fetch(urlPage)
        .then((res) => res.text())
        .then((res) => {
            $('#body-content').html(res)
        })
        .catch(res => {
            $('#body-content').html(res.status)
        })
        .then(() => {
            getTheme()
            M.Sidenav.getInstance($('.sidenav')).close();
            console.log(page)
            switch (page) {
                case 'home':
                    $('.card > .card-action > a').each(function() {

                        let player_name = $(this).attr('data-href').substr(8)
                        $(this).click(function() {
                            player_info(player_name)
                        })
                    })
                    break

                case 'feedback':
                    $('.feedback-send').click(() => {

                        let email = $('#email').val()
                        let message = $('#message').val()
                        let container = $('#body-content')
                        let loading = `<div class="progress">
                                        <div class="indeterminate"></div>
                                    </div>`
                        let thanks = `<div class="s12 l12 center notif">
                                        <div><img class="responsive-img signal" src="./assets/img/ui/thanks.svg"></div>
                                        <div><h3>Thank you :)</h3></div>
                                        <div><span>your feedback supporting me</span></div><br><br>
                                        <div class="center">
                                            <button class="btn waves-effect waves-light round" onclick="route('home')"><i class="material-icons">arrow_back</i></button>
                                        </div>
                                    </div>`
                        let errMessage = `<div class="s12 l12 center notif">
                                        <div><img class="responsive-img signal" src="./assets/img/ui/signal.svg"></div>
                                        <div><h3>no network</h3></div>
                                        <div><span>Please check your network connectivity</span></div>
                                    </div>`

                        container.html(loading)
                        $.ajax({
                            method: 'post',
                            url: 'https://api.kangkode.site/v1/feedback_send',
                            data: {
                                email: email,
                                message: message
                            },
                            success: res => {
                                container.html(thanks)
                            },
                            error: function(xhr) {
                                container.html(errMessage)
                            }
                        })
                    })
                    break
                case 'standings':
                    $('.standings > div > a').each((index, item) => {
                        let uri = $(item).attr('href').substr(11)
                        $(item).click(() => {
                            RouterStanding(uri)
                        })
                    })
                    break
                default:
                    //nothing
            }
        })
}

const player_info = player_name => {
    $.ajax({
        url: `assets/json/${player_name}.json`,
        method: 'get',
        dataType: 'json',
        beforeSend: () => {
            $('#player_info').html("wait")
        },
        success: res => {
            let info = `    <div class="modal-content">
                                <h4 class="align-center" id="player_name">${res.name}</h4>
                                <div class="center">
                                    <img class="responsive-img" id="player_image" src="${res.path}" alt="player">
                                </div>
                                <p class="justify" id="player_biography">${res.bio}</p>
                            </div>`
            $('#player_info').html(info)
        }
    }).then($('#player_info').modal())
}

const colorPlateListener = () => {
    getTheme()
    $('#color_plate > li > a').each(function() {
        let datacolor = $(this).attr('data-color')
        let color = ''
        switch (datacolor) {
            case 'red':
                color = 'red'
                break
            case 'black':
                color = 'grey darken-4'
                break
            case 'green':
                color = 'green'
                break
            default:
                color = 'blue darken-1'
        }

        $(this).click(e => {
            e.preventDefault()
            $('#nav').attr('class', color)
            $('#card-nav').attr('class', `card-panel ${color} rem-mt`)
                // $('.scroll-to-top, .btn-back').removeClass('red green grey blue darken-1 darken-4')
                // $('.scroll-to-top, .btn-back').addClass(color)
            $('.red, .green, .grey.darken-4, .blue.darken-1').not('i.red, i.green, i.grey.darken-4, i.blue.darken-1').each(function() {
                $(this).removeClass('red green grey blue darken-1 darken-4')
                $(this).addClass(color)
            })
            setTheme(datacolor)
        })
    })
}

const navListener = () => {
    loadSidebar() //load name on index db
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    $('.sidenav > li > a, .topnav > li > a').each(function() {
        let loaded = $(this).attr('href').substr(1)

        $(this).click(function() {
            M.Sidenav.getInstance($('.sidenav')).close();
            route(loaded)
        })
    });
}

const btnSettingsListener = () => {
    $('.settings > a').on('click', () => {
        let settingPage = $('.settings > a').attr('href').substr(1)
        console.log(settingPage);

        route(settingPage)
    })
}

const setMaterialize = () => {
    $('.modal').modal()
    $('.dropdown-trigger').dropdown()
    $('.tooltipped').tooltip()
}

const RouterStanding = async(params) => {

    let loading = `<div class="col s3 l3 progress">
                        <div class="indeterminate"></div>
                    </div>
                    `

    $('#body-content').html(loading)

    const api = 'https://api.football-data.org/v2/competitions/[team]/standings'
    const token = '65906dfb1c20470e85c965142a97d3ba'
    const options = {
        method: 'get',
        headers: {
            'X-Auth-Token': token
        }
    }
    const url = {
        bundesliga: 2002,
        laliga: 2014,
        league1: 2015,
        premier: 2021,
        seriea: 2019
    }

    let newapi = api.replace('[team]', url[params])

    try {
        let data = await fetch(newapi, options)

        let json = await data.json()
        let result = await json.standings[0]
        let table = await result.table
        console.log(result)

        //make empty
        let content = ``

        let starred = await getStarredTeam()

        //id starred team in array
        table.forEach(item => {
            //if item.team.id in array of id starred, checked is true
            let checked = ''

            for (let i in starred) {
                if (starred[i].team_id == item.team.id) {
                    checked = 'checked'
                    break
                }
            }

            content += `
            <div class="col s12 m7">
            <h4 class="header">${item.position+". "+item.team.name}</h4>
            <div class="card horizontal">
                <a href="#!" data-id="${item.team.id}" data-url="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}" data-name="${item.team.name}" class="starred ${checked}"><i class="small material-icons circle">grade</i></a>
              <div class="card-image icon-club">
                <img alt="club ${item.team.name}" onerror="this.src='./assets/img/icon/Icon-144.png'" src="./assets/img/icon/Icon-144.png" class="icon-club lazyload" data-src="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <ul class="collection">
                    <li class="collection-item avatar">
                      <i class="material-icons circle blue">event_available</i>
                      <span class="title">Played Game</span>
                      <p>
                        <b>${item.playedGames}</b>
                      </p>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle green">thumb_up</i>
                      <span class="title">Won</span>
                      <p>
                        <b>${item.won}</b>
                      </p>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle">pause</i>
                      <span class="title">Draw</span>
                      <p><b>${item.draw}</b> <br>
                      </p>
                    </li>
                    <li class="collection-item avatar">
                      <i class="material-icons circle red">thumb_down</i>
                      <span class="title">Lost</span>
                      <p><b>${item.lost}</b> <br>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            `
        })

        let defaultTheme = getDefaultTheme().then(color => {
            content += `          
                <a class="btn-floating waves-effect waves-light btn-large ${color} btn-back"><i class="material-icons circle">arrow_back</i></a>
            <div class="floating-bottom"> 
                <a class="btn-floating btn-large waves-effect waves-light ${color} scroll-to-top"><i class="material-icons">expand_less</i></a>
            </div>
            `
            document.querySelector('#body-content').innerHTML = content
        }).then(() => {
            //event when starred
            $('.starred').each(function() {
                let elem = $(this)
                let id = elem.data('id')
                let name = elem.data('name')
                let path_img = elem.data('url')

                let data = {
                    id,
                    name,
                    path_img
                }

                elem.click(function(e) {
                    e.preventDefault()
                    setStarredTeam(id, data)
                    let isStarred = elem.hasClass('checked')

                    let message = ''
                    if (!isStarred) {
                        message = data.name + " has been starred"
                        elem.addClass('checked')
                    } else {
                        message = data.name + " has been unstarred"
                        elem.removeClass('checked')
                    }

                    M.toast({ html: message, classes: 'rounded', displayLength: 1000 });

                })
            })

            //event when btn back clicked
            $('.btn-back').click(() => {
                route("standings")
            })

            // event when scroll to top clicked
            $('.floating-bottom').click(event => {
                event.preventDefault()
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            })

            //hide button scroll when first loaded
            $('.scroll-to-top').hide()

            //event hide/show when scroll
            window.onscroll = function() {
                if (window.scrollY >= 500) {
                    $('.scroll-to-top').fadeIn('500')
                } else {
                    $('.scroll-to-top').fadeOut('500')
                }
            }
        })
    } catch (err) {
        console.log("errrorrrrr")
        RouterError(RouterStanding, params)
    }

}

const RouterError = (callback, params) => {
    let errMessage = `<div class="s12 l12 center notif">
                                    <div><img class="responsive-img signal" src="./assets/img/ui/signal.svg"></div>
                                    <div><h3>no network</h3></div>
                                    <div><span>Please check your network connectivity</span></div>
                                    <div><a href="" class="waves-effect reload"><i class="material-icons font-red right-align">refresh</i></a></di>
                                </div>`
    $('#body-content').html(errMessage)
    $('.reload').click((event) => {
        event.preventDefault()
        callback(params)
    })
    console.log("no internet connection")
}

const routeEmptyStarred = () => {
    let emptyMess = `
        <div class="s12 l12 center notif">
            <div><img class="responsive-img signal" src="./assets/img/ui/fans.svg"></div>
            <div><h4>Nothing Fav Team</h4></div>
            <div>have you a nice day</div>
        </div>
    `
    $('#body-content').html(emptyMess)
}

//key
//65906dfb1c20470e85c965142a97d3ba