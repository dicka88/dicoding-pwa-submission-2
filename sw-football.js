const CACHE_NAME = "PWA-Football-v0.01";

const urlToCache = [
    //index page
    "./index.html",

    //vendor
    "./vendor/materialize/materialize.min.css",
    "./vendor/materialize/materialize.min.js",
    "./vendor/jquery/jquery.min.js",
    "./vendor/material-icon/deploy.css",
    "./vendor/material-icon/font-materialize.woff2",
    "./vendor/idb/idb.js",
    "./vendor/lazyload/lazyload.min.js",

    //pages
    "./pages/home.html",
    "./pages/listClub.html",
    "./pages/standings.html",
    "./pages/schedule.html",
    "./pages/stadium.html",
    "./pages/feedback.html",

    //asset custom
    "./assets/css/style.css",
    "./assets/js/custom.js",
    "./assets/js/indexDb.js",

    //image
    "./assets/img/icon-512x512.png",
        //player
        "./assets/img/player/cr7.jpg",
        "./assets/img/player/messi.jpg",
        "./assets/img/player/neymar.jpg",
        //stadium
        "./assets/img/stadium/camp_nou.jpg",
        "./assets/img/stadium/santiago_bernabeu.jpg",
        "./assets/img/stadium/parc_des_princes.jpg",
        //club
        "./assets/img/club/english/Arsenal-FC-icon.png",
        "./assets/img/club/english/Chelsea-FC-icon.png",
        "./assets/img/club/english/Tottenham-Hotspur-icon.png",
        "./assets/img/club/spain/Athletic-Bilbao-icon.png",
        "./assets/img/club/spain/Atletico-Madrid-icon.png",
        "./assets/img/club/spain/FC-Barcelona-icon.png",
        "./assets/img/club/spain/Real-Madrid-icon.png",
        "./assets/img/club/spain/Valencia-icon.png",
        //banner
        "./assets/img/club/banner/bundes.jpg",
        "./assets/img/club/banner/laliga.jpg",
        "./assets/img/club/banner/league1.jpg",
        "./assets/img/club/banner/premier.jpg",
        "./assets/img/club/banner/seriea.jpg",
        //ui
        "./assets/img/ui/signal.svg",
        "./assets/img/ui/thanks.svg",
        //icon
        "./assets/img/icon/Icon-96.png",
        "./assets/img/icon/Icon-36.png",

    //data json
    "./assets/json/cristianoronaldo.json",
    "./assets/json/leonelmessi.json",
    "./assets/json/neymarjr.json",

    //web info
    "./manifest.json",

    //system
    "./sw-reg.js",
    "./sw-football.js",

];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
                console.log("ServiceWorker: cache " + cacheName + " dihapus");
                return caches.delete(cacheName);
            }
            })
        );
        })
    );
});

//default
// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//       caches
//         .match(event.request, { cacheName: CACHE_NAME })
//         .then(function(response) {
//           if (response) {
//             console.log("sw offline:  ", response.url);
//             return response;
//           }
   
//           console.log(
//             "sw online:  ",
//             event.request.url
//           );
//           return fetch(event.request);
//         })
//     );
// });

//default
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("sw offline:  ", response.url);
            return response;
          }
   
          console.log(
            "sw online:  ",
            event.request.url
          );

            // caches.open(CACHE_NAME).then(function(cache){
            //     return cache.add(event.request);
            // })

          return fetch(event.request);
        })
    );
});

  
