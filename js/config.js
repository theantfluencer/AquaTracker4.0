/*
===========================================
 AquaTracker 4.0
 config.js
===========================================
*/

"use strict";

const CONFIG = Object.freeze({

    APP: {

        NAME: "AquaTracker",

        VERSION: "4.0.0",

        AUTHOR: "Sascha Orzech"

    },

    STORAGE: {

        AQUARIUMS: "aquatracker.aquariums",

        SETTINGS: "aquatracker.settings"

    },

    DATE: {

        LOCALE: "de-DE"

    },

    UI: {

        SNACKBAR_TIME: 3000,

        CARD_ANIMATION: 180

    },

    DEFAULTS: {

        AQUARIUM: {

            NAME: "Neues Aquarium",

            LOCATION: "",

            VOLUME: 60,

            WIDTH: 60,

            DEPTH: 30,

            HEIGHT: 35,

            PHOTO: "",

            NOTES: ""

        },

        MAINTENANCE: [

            {

                id: "water-change",

                name: "Wasserwechsel",

                icon: "water_drop",

                interval: 7,

                enabled: true

            },

            {

                id: "fertilizer",

                name: "Düngung",

                icon: "eco",

                interval: 1,

                enabled: true

            },

            {

                id: "filter",

                name: "Filter reinigen",

                icon: "filter_alt",

                interval: 30,

                enabled: true

            },

            {

                id: "water-test",

                name: "Wasserwerte",

                icon: "science",

                interval: 14,

                enabled: true

            }

        ]

    }

});
