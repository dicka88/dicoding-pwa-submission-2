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