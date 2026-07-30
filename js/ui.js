/*
===========================================
 AquaTracker 4.0
 js/ui.js
===========================================
*/

"use strict";

const UI = (() => {

    let dialog;
    let snackbar;

    /*
    ===========================================
     Initialisierung
    ===========================================
    */

    function init() {

        dialog = document.getElementById("dialog");
        snackbar = document.getElementById("snackbar");

    }

    /*
    ===========================================
     Aquarium-Dialog
    ===========================================
    */

    function showAquariumDialog(aquarium = null) {

        if (!dialog)
            return;

        const isNew = aquarium === null;

        const data = aquarium ?? {

            name: "",
            location: "",
            volume: 60

        };

        dialog.innerHTML = `

            <form id="aquariumForm" method="dialog">

                <h2>

                    ${isNew ? "Aquarium anlegen" : "Aquarium bearbeiten"}

                </h2>

                <label>

                    Name

                    <input
                        id="aqName"
                        type="text"
                        maxlength="60"
                        required
                        value="${escape(data.name)}">

                </label>

                <label>

                    Standort

                    <input
                        id="aqLocation"
                        type="text"
                        maxlength="60"
                        value="${escape(data.location)}">

                </label>

                <label>

                    Volumen (Liter)

                    <input
                        id="aqVolume"
                        type="number"
                        min="1"
                        max="10000"
                        required
                        value="${data.volume}">

                </label>

                <div class="dialog-actions">

                    <button
                        type="button"
                        class="button button-secondary"
                        id="cancelButton">

                        Abbrechen

                    </button>

                    <button
                        type="submit"
                        class="button button-primary">

                        ${isNew ? "Anlegen" : "Speichern"}

                    </button>

                </div>

            </form>

        `;

        dialog.showModal();

        dialog
            .querySelector("#cancelButton")
            .addEventListener("click", () => {

                dialog.close();

            });

        dialog
            .querySelector("#aquariumForm")
            .addEventListener("submit", event => {

                event.preventDefault();

                const values = {

                    name: dialog.querySelector("#aqName").value.trim(),

                    location: dialog.querySelector("#aqLocation").value.trim(),

                    volume: Number(
                        dialog.querySelector("#aqVolume").value
                    )

                };

                if (!values.name) {

                    showSnackbar("Bitte einen Namen eingeben.");

                    return;

                }

                if (isNew) {

                    const item = Data.createAquarium();

                    Object.assign(item, values);

                    Data.addAquarium(item);

                    showSnackbar("Aquarium angelegt.");

                }

                else {

                    Data.updateAquarium(
                        aquarium.id,
                        values
                    );

                    showSnackbar("Aquarium gespeichert.");

                }

                dialog.close();

                Aquarium.render();

            });

    }

    /*
    ===========================================
     Snackbar
    ===========================================
    */

    function showSnackbar(message) {

        if (!snackbar)
            return;

        snackbar.textContent = message;

        snackbar.classList.add("show");

        clearTimeout(showSnackbar.timer);

        showSnackbar.timer = setTimeout(() => {

            snackbar.classList.remove("show");

        }, 3000);

    }

    /*
    ===========================================
     HTML absichern
    ===========================================
    */

    function escape(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\"", "&quot;")
            .replaceAll("'", "&#39;");

    }

    /*
    ===========================================
     Export
    ===========================================
    */

    return {

        init,

        showAquariumDialog,

        showSnackbar

    };

})();

document.addEventListener("DOMContentLoaded", () => {

    UI.init();

});
