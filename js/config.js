/*
===========================================
 AquaTracker 4.0
 js/config.js
===========================================
*/

"use strict";

const CONFIG = Object.freeze({

    APP_NAME: "AquaTracker",

    VERSION: "4.0.0",

    STORAGE: {

        AQUARIUMS: "aquatracker.aquariums",

        SETTINGS: "aquatracker.settings",

        PRODUCTS: "aquatracker.products"

    },

    DATE: {

        LOCALE: "de-DE",

        OPTIONS: {

            day: "2-digit",
            month: "2-digit",
            year: "numeric"

        },

        DATETIME_OPTIONS: {

            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"

        }

    },

    DEFAULTS: {

        AQUARIUM: {

            NAME: "Neues Aquarium",

            LOCATION: "",

            VOLUME: 60,

            DIMENSIONS: {

                WIDTH: 60,

                DEPTH: 30,

                HEIGHT: 35

            }

        },

        MAINTENANCE: {

            WATER_CHANGE: {

                ID: "water-change",

                NAME: "Wasserwechsel",

                ICON: "water_drop",

                INTERVAL: 7

            },

            FILTER: {

                ID: "filter",

                NAME: "Filter reinigen",

                ICON: "filter_alt",

                INTERVAL: 30

            },

            FERTILIZER: {

                ID: "fertilizer",

                NAME: "Düngen",

                ICON: "eco",

                INTERVAL: 1

            },

            WATER_TEST: {

                ID: "water-test",

                NAME: "Wasserwerte",

                ICON: "science",

                INTERVAL: 14

            }

        }

    },

    UI: {

        SNACKBAR_DURATION: 3000

    }

});
