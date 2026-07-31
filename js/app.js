/*
===========================================
 AquaTracker 4.0
 js/app.js
===========================================
*/

"use strict";

document.addEventListener("DOMContentLoaded", initApp);

/*
===========================================
 Initialisierung
===========================================
*/

function initApp() {

    console.log(
        `${CONFIG.APP.NAME} ${CONFIG.APP.VERSION} gestartet`
    );

    initModules();

    initEvents();

    registerServiceWorker();

}

/*
===========================================
 Module
===========================================
*/

function initModules() {

    Data.init();

    UI.init();

    Aquarium.init();

}

/*
===========================================
 Globale Events
===========================================
*/

function initEvents() {

    initFab();

    window.addEventListener(
        "storage",
        handleStorageChange
    );

}

/*
===========================================
 Floating Action Button
===========================================
*/

function initFab() {

    const fab = document.getElementById("fab");

    if (!fab)
        return;

    fab.addEventListener("click", () => {

        if (typeof UI.showAquariumDialog === "function") {

            UI.showAquariumDialog();

        } else {

            createAquarium();

        }

    });

}

/*
===========================================
 Neues Aquarium
===========================================
*/

function createAquarium() {

    const aquarium = Data.createAquarium();

    aquarium.name =
        `Aquarium ${AppData.aquariums.length + 1}`;

    Data.addAquarium(aquarium);

    Aquarium.render();

}

/*
===========================================
 Storage Sync
===========================================
*/

function handleStorageChange(event) {

    if (event.key !== CONFIG.STORAGE.AQUARIUMS)
        return;

    Data.init();

    Aquarium.render();

}

/*
===========================================
 Service Worker
===========================================
*/

function registerServiceWorker() {

    if (!("serviceWorker" in navigator))
        return;

    fetch("service-worker.js", {
        method: "HEAD"
    })

    .then(response => {

        if (!response.ok)
            return;

        return navigator.serviceWorker.register(
            "service-worker.js"
        );

    })

    .then(registration => {

        if (registration) {

            console.log(
                "Service Worker registriert"
            );

        }

    })

    .catch(() => {

        console.log(
            "Kein Service Worker vorhanden."
        );

    });

}
