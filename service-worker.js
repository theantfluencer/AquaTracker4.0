/*
===========================================
 AquaTracker 4.0
 service-worker.js
===========================================
*/

"use strict";

const CACHE_NAME = "aquatracker-v4";

const FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./assets/css/variables.css",

    "./assets/css/app.css",

    "./js/config.js",

    "./js/utils.js",

    "./js/storage.js",

    "./js/data.js",

    "./js/ui.js",

    "./js/aquarium.js",

    "./js/app.js"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(FILES))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys =>

                Promise.all(

                    keys

                        .filter(key => key !== CACHE_NAME)

                        .map(key => caches.delete(key))

                )

            )

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});
