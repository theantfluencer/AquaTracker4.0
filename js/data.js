/*
===========================================
 AquaTracker 4.0
 js/data.js
===========================================
*/

"use strict";

const AppData = {

    version: CONFIG.APP.VERSION,

    aquariums: []

};

const Data = (() => {

    /*
    ===========================================
    Initialisierung
    ===========================================
    */

    function init() {

        AppData.aquariums =
            Storage.getAquariums();

    }

    /*
    ===========================================
    Speichern
    ===========================================
    */

    function save() {

        Storage.saveAquariums(
            AppData.aquariums
        );

    }

    /*
    ===========================================
    Neues Aquarium
    ===========================================
    */

    function createAquarium() {

        return {

            id: Utils.uuid(),

            name: "Neues Aquarium",

            location: "",

            volume: 60,

            dimensions: {

                width: 60,

                depth: 30,

                height: 35

            },

            photo: "",

            created: Utils.today(),

            notes: "",

            maintenance: [

                {

                    id: Utils.uuid(),

                    name: "Wasserwechsel",

                    icon: "water_drop",

                    interval: 7,

                    lastDone: Utils.today(),

                    priority: "high",

                    enabled: true

                },

                {

                    id: Utils.uuid(),

                    name: "Filter reinigen",

                    icon: "filter_alt",

                    interval: 30,

                    lastDone: Utils.today(),

                    priority: "medium",

                    enabled: true

                },

                {

                    id: Utils.uuid(),

                    name: "Düngen",

                    icon: "eco",

                    interval: 1,

                    lastDone: Utils.today(),

                    priority: "medium",

                    enabled: true

                },

                {

                    id: Utils.uuid(),

                    name: "Wasserwerte",

                    icon: "science",

                    interval: 14,

                    lastDone: Utils.today(),

                    priority: "high",

                    enabled: true

                }

            ],

            livestock: [],

            plants: [],

            equipment: [],

            history: []

        };

    }

    /*
    ===========================================
    CRUD
    ===========================================
    */

    function addAquarium(aquarium) {

        AppData.aquariums.push(aquarium);

        save();

        return aquarium;

    }

    function updateAquarium(id, values) {

        const aquarium =
            getAquarium(id);

        if (!aquarium)
            return false;

        Object.assign(aquarium, values);

        save();

        return true;

    }

    function deleteAquarium(id) {

        AppData.aquariums =
            AppData.aquariums.filter(
                aquarium => aquarium.id !== id
            );

        save();

    }

    function getAquarium(id) {

        return AppData.aquariums.find(
            aquarium => aquarium.id === id
        ) || null;

    }

    /*
    ===========================================
    Wartung
    ===========================================
    */

    function getMaintenanceStatus(task) {

        const today =
            new Date(Utils.today());

        const last =
            new Date(task.lastDone);

        const days =
            Math.floor(
                (today - last) / 86400000
            );

        const overdue =
            Math.max(
                0,
                days - task.interval
            );

        return {

            days,

            overdue,

            progress: Math.min(
                100,
                Math.round(
                    (days / task.interval) * 100
                )
            ),

            due: overdue > 0

        };

    }

    /*
    ===========================================
    Gesundheitsindex
    ===========================================
    */

    function calculateHealth(aquarium) {

        let score = 100;

        aquarium.maintenance.forEach(task => {

            if (!task.enabled)
                return;

            const status =
                getMaintenanceStatus(task);

            if (status.overdue > 0) {

                score -= Math.min(
                    status.overdue * 2,
                    25
                );

            }

        });

        return Math.max(score, 0);

    }

    /*
    ===========================================
    Export
    ===========================================
    */

    return {

        init,

        save,

        createAquarium,

        addAquarium,

        updateAquarium,

        deleteAquarium,

        getAquarium,

        calculateHealth,

        getMaintenanceStatus

    };

})();
