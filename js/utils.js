/*
===========================================
 AquaTracker 4.0
 utils.js
===========================================
*/

"use strict";

const Utils = (() => {

    function uuid() {

        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
            .replace(/[xy]/g, c => {

                const r = Math.random() * 16 | 0;
                const v = c === "x"
                    ? r
                    : (r & 0x3 | 0x8);

                return v.toString(16);

            });

    }

    function today() {

        return new Date().toISOString().slice(0, 10);

    }

    function now() {

        return new Date().toISOString();

    }

    function formatDate(date) {

        if (!date) return "";

        return new Date(date)
            .toLocaleDateString(
                CONFIG.DATE.LOCALE
            );

    }

    function formatDateTime(date) {

        if (!date) return "";

        return new Date(date)
            .toLocaleString(
                CONFIG.DATE.LOCALE
            );

    }

    function daysBetween(start, end = today()) {

        const d1 = new Date(start);
        const d2 = new Date(end);

        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);

        return Math.floor(
            (d2 - d1) / 86400000
        );

    }

    function deepCopy(object) {

        return structuredClone(object);

    }

    function clamp(value, min, max) {

        return Math.min(
            Math.max(value, min),
            max
        );

    }

    function escapeHTML(text) {

        return String(text ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");

    }

    function createMaintenanceDefaults() {

        return CONFIG.DEFAULTS.MAINTENANCE.map(item => ({

            id: item.id,

            name: item.name,

            icon: item.icon,

            interval: item.interval,

            enabled: item.enabled,

            lastDone: today()

        }));

    }

    function calculateHealth(aquarium) {

        let score = 100;

        aquarium.maintenance.forEach(task => {

            if (!task.enabled)
                return;

            const age = daysBetween(task.lastDone);

            if (age > task.interval) {

                score -= Math.min(
                    (age - task.interval) * 2,
                    25
                );

            }

        });

        return clamp(score, 0, 100);

    }

    return {

        uuid,

        today,

        now,

        formatDate,

        formatDateTime,

        daysBetween,

        deepCopy,

        clamp,

        escapeHTML,

        createMaintenanceDefaults,

        calculateHealth

    };

})();
