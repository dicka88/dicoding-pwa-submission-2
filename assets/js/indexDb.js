    //Cek indexDb apakah ada ? jika ada lakukan fetch dan isi data ke DOM
    const indexDb = idb.open('football', 1, db => {
        if (!db.objectStoreNames.contains('account')) {
            const account = db.createObjectStore('account', {
                keyPath: 'id',
                autoIncrement: !0
            })

            account.createIndex('nickname', 'nickname')
            account.createIndex('name', 'name')
            account.createIndex('gender', 'gender')
        }
    })

    const loadAccount = () => {
        indexDb.then(db => {
            const tx = db.transaction('account', 'readonly')
            const st = tx.objectStore('account')

            let isOwn = st.get(1)
            return isOwn

        }).then(res => {
            if (!undefined) {
                const form = $('#form-settings')

                let nickname = form.find('#nickname')
                let name = form.find('#name')
                let gender = form.find('input[value=' + res.gender + ']').prop('checked', true)
                nickname.val(res.nickname)
                name.val(res.name)

                M.updateTextFields();
            }
        })
    }

    const loadSidebar = () => {
        indexDb.then(db => {
            const tx = db.transaction('account', 'readonly')
            const st = tx.objectStore('account')

            let isOwn = st.get(1)
            return isOwn
        }).then(res => {
            if (!undefined) {
                $('#account-user-name').text(res.nickname)
            } else {
                $('#account-user-name').text("Default account")
            }
        })
    }

    const updateAccount = (nickname, name, gender) => {
        indexDb.then(db => {
            const tx = db.transaction('account', 'readwrite')
            const st = tx.objectStore('account')

            let params = {
                id: 1,
                nickname,
                name,
                gender
            }

            let isOwn = st.put(params)
            return tx.complete

        }).then(res => {
            loadSidebar()
            console.log("added to indexDb");
            M.toast({ html: 'Success data saved', classes: 'rounded' });
        })
    }