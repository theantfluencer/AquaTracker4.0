/*
===========================================
 AquaTracker 4.0
 storage.js
===========================================
*/

"use strict";

const Storage = (() => {

    /*
    ===========================================
     Interne Helfer
    ===========================================
    */

    function read(key, fallback) {

        try {

            const value = localStorage.getItem(key);

            if (value === null)
                return Utils.deepCopy(fallback);

            return JSON.parse(value);

        } catch (error) {

            console.error("Storage lesen:", error);

            return Utils.deepCopy(fallback);

        }

    }

    function write(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error("Storage schreiben:", error);

            return false;

        }

    }

    /*
    ===========================================
     Aquarien
    ===========================================
    */

    function getAquariums() {

        return read(
            CONFIG.STORAGE.AQUARIUMS,
            []
        );

    }

    function saveAquariums(aquariums) {

        return write(
            CONFIG.STORAGE.AQUARIUMS,
            aquariums
        );

    }

    /*
    ===========================================
     Einstellungen
    ===========================================
    */

    function getSettings() {

        return read(
            CONFIG.STORAGE.SETTINGS,
            {

                theme: "system",

                language: "de",

                notifications: true

            }

        );

    }

    function saveSettings(settings) {

        return write(
            CONFIG.STORAGE.SETTINGS,
            settings
        );

    }

    /*
    ===========================================
     Komplettes Backup
    ===========================================
    */

    function exportData() {

        return {

            version: CONFIG.APP.VERSION,

            exported: Utils.now(),

            aquariums: getAquariums(),

            settings: getSettings()

        };

    }

    function importData(data) {

        if (!data)
            return false;

        if (!Array.isArray(data.aquariums))
            return false;

        saveAquariums(data.aquariums);

        if (data.settings) {

            saveSettings(data.settings);

        }

        return true;

    }

    /*
    ===========================================
     Alles löschen
    ===========================================
    */

    function clearAll() {

        localStorage.removeItem(
            CONFIG.STORAGE.AQUARIUMS
        );

        localStorage.removeItem(
            CONFIG.STORAGE.SETTINGS
        );

    }

    /*
    ===========================================
     Export
    ===========================================
    */

    return {

        getAquariums,

        saveAquariums,

        getSettings,

        saveSettings,

        exportData,

        importData,

        clearAll

    };

})();
