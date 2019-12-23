document.addEventListener("DOMContentLoaded", () => {
    var page = window.location.hash.substr(1);
    console.log(page.split('/'));

    console.log(page);

    if (page == '') {
        page = 'home'
    }

    route(page);

    setMaterialize()

    navListener()

    btnSettingsListener()

    colorPlateListener()

    //feedbackListener()
});

const route = (page) => {

    urlPage = "pages/" + page + ".html";

    $.ajax({
        method: 'get',
        url: urlPage,
        success: response => {
            $('#body-content').html(response)
        },
        error: response => {
            $('#body-content').html(response.status)
        }
    }).then(() => {
        M.Sidenav.getInstance($('.sidenav')).close();

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

// const feedbackListener = () => {
//     $('.feedback-send').click(() => {

//         let email = $('#email').val()
//         let message = $('#message').val()
//         let container = $('#body-content')
//         let thanks = `thanks`
//         let errMessage = `no internet connection`

//         $.ajax({
//             method: 'get',
//             url: 'https://api.kangkode.site/v1/feedback/give',
//             success: res => {
//                 container.html(thanks)
//             },
//             error: err => {
//                 container.html(errMessage)
//             }
//         })
//     })
// }

const colorPlateListener = () => {
    $('#color_plate > li > a').each(function() {
        let color = $(this).attr('data-color')
        switch (color) {
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

        $(this).click(function() {
            $('#nav').attr('class', color)
            $('#card-nav').attr('class', `card-panel ${color} rem-mt`)
        })
    })
}

const navListener = () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    $('.sidenav > li > a, .topnav > li > a').each(function() {
        let loaded = $(this).attr('href').substr(1)

        $(this).click(function() {
            route(loaded)
                //M.Sidenav.getInstance($('.sidenav')).close();
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