if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
    navigator.serviceWorker
        .register("./sw-football.js")
        .then(function() {
        console.log("SW registered");
        })
        .catch(function() {
        console.log("SW failed");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

if ('Notification' in window) {
     Notification.requestPermission()
        .then(res => {
            console.log(res)
        })
} else {
    console.log("Notification didn't supported by this browser");
}

//register push service google cloud messenging
    if ('PushManager' in window) {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BBJ51slZXoZss2hxV_7pkdKAjZHFVkHjwNV3NfO1-T19OvaqeWgb8_SwSZCfjB5wNtT03IG49n4tt4jkqxCN0u0')
            }).then(subscribe => {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch((err) => {
                console.log("Tidak dapat melakukan subscribe " + err.message);

            })
        })
    }

    function urlBase64ToUint8Array(base64) {
        const padding = '='.repeat((4 - base64.length % 4) % 4);
        var base64 = (base64 + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    const title = "Hello Football Fans"
    const option2 = {
        body: 'Welcome to Apps My Football',
        //requireInteraction: !0,
        icon: './assets/img/icon-512x512.png',
        badge: './assets/img/icon-512x512.png',
        // actions: [{
        //     action: 'yes-action',
        //     title: 'Yoi bro'
        // }, {
        //     action: 'no-action',
        //     title: 'Tidak bro'
        // }],
        tag: 'option2'
    }

    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification(title, option2)
        })
    } else {
        console.log("tdk bisa");
    }