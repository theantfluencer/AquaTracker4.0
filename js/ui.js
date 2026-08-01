/*
===========================================
 AquaTracker 4.0
 js/ui.js
===========================================
*/

"use strict";

const UI = (() => {

    let dialog = null;

    let snackbar = null;

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

        }, CONFIG.UI.SNACKBAR_TIME);

    }

    /*
    ===========================================
     Aquariumdialog
    ===========================================
    */

    function showAquariumDialog(aquarium = null) {

        const isNew =
            aquarium === null;

        dialog.innerHTML = `

            <form id="aquariumForm"
                  method="dialog">

                <h2>

                    ${
                        isNew
                        ? "Aquarium anlegen"
                        : "Aquarium bearbeiten"
                    }

                </h2>

                <label>

                    Name

                    <input
                        id="aqName"
                        type="text"
                        maxlength="60"
                        required
                        value="${
                            aquarium
                            ? escapeHtml(aquarium.name)
                            : ""
                        }">

                </label>

                <label>

                    Standort

                    <input
                        id="aqLocation"
                        type="text"
                        maxlength="60"
                        value="${
                            aquarium
                            ? escapeHtml(aquarium.location)
                            : ""
                        }">

                </label>

                <label>

                    Liter

                    <input
                        id="aqVolume"
                        type="number"
                        min="1"
                        value="${
                            aquarium
                            ? aquarium.volume
                            : 60
                        }">

                </label>

                <div class="dialog-buttons">

                    <button
                        type="button"
                        class="button button-secondary"
                        id="cancelButton">

                        Abbrechen

                    </button>

                    <button
                        type="submit"
                        class="button button-primary">

                        ${
                            isNew
                            ? "Anlegen"
                            : "Speichern"
                        }

                    </button>

                </div>

            </form>

        `;

        dialog.showModal();
             document
            .getElementById("cancelButton")
            .addEventListener("click", () => {

                dialog.close();

            });

        document
            .getElementById("aquariumForm")
            .addEventListener("submit", event => {

                event.preventDefault();

                const values = {

                    name:
                        document
                            .getElementById("aqName")
                            .value
                            .trim(),

                    location:
                        document
                            .getElementById("aqLocation")
                            .value
                            .trim(),

                    volume:
                        Number(
                            document
                                .getElementById("aqVolume")
                                .value
                        )

                };

                if (!values.name) {

                    showSnackbar(
                        "Bitte einen Namen eingeben."
                    );

                    return;

                }

                if (values.volume <= 0) {

                    showSnackbar(
                        "Bitte eine gültige Literzahl eingeben."
                    );

                    return;

                }

                if (isNew) {

                    const newAquarium =
                        Data.createAquarium();

                    Object.assign(
                        newAquarium,
                        values
                    );

                    Data.addAquarium(
                        newAquarium
                    );

                    showSnackbar(
                        "Aquarium angelegt."
                    );

                }

                else {

                    Data.updateAquarium(

                        aquarium.id,

                        values

                    );

                    showSnackbar(
                        "Aquarium gespeichert."
                    );

                }

                dialog.close();

                Aquarium.render();

            });

    }

    /*
    ===========================================
     Bestätigungsdialog
    ===========================================
    */

    function confirmDelete(

        title,

        text,

        callback

    ) {

        dialog.innerHTML = `

            <h2>

                ${escapeHtml(title)}

            </h2>

            <p>

                ${escapeHtml(text)}

            </p>

            <div class="dialog-buttons">

                <button
                    id="cancelDelete"
                    class="button button-secondary">

                    Abbrechen

                </button>

                <button
                    id="confirmDelete"
                    class="button button-primary">

                    Löschen

                </button>

            </div>

        `;

        dialog.showModal();

        document
            .getElementById("cancelDelete")
            .addEventListener("click", () => {

                dialog.close();

            });

        document
            .getElementById("confirmDelete")
            .addEventListener("click", () => {

                dialog.close();

                callback();

            });

    }
     /*
    ===========================================
     Dialog schließen
    ===========================================
    */

    function closeDialog() {

        if (!dialog)
            return;

        dialog.close();

    }

    /*
    ===========================================
     HTML absichern
    ===========================================
    */

    function escapeHtml(text) {

        return String(text ?? "")

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#39;");

    }

    /*
    ===========================================
     Export
    ===========================================
    */

    return {

        init,

        showSnackbar,

        showAquariumDialog,

        confirmDelete,

        closeDialog

    };

})();
