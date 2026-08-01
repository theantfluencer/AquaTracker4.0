/*
===========================================
 AquaTracker 4.0
 js/aquarium.js
===========================================
*/

"use strict";

const Aquarium = (() => {

    let container = null;

    /*
    ===========================================
     Initialisierung
    ===========================================
    */

    function init() {

        container = document.getElementById("app-content");

        render();

    }

    /*
    ===========================================
     Dashboard
    ===========================================
    */

    function render() {

        if (!container)
            return;

        container.innerHTML = "";

        if (AppData.aquariums.length === 0) {

            container.innerHTML = `

                <section class="empty-state">

                    <span class="material-symbols-rounded">
                        aquarium
                    </span>

                    <h2>Noch keine Aquarien</h2>

                    <p>
                        Tippe auf das Plus-Symbol,
                        um dein erstes Aquarium anzulegen.
                    </p>

                </section>

            `;

            return;

        }

        const grid = document.createElement("section");

        grid.className = "aquarium-grid";

        AppData.aquariums.forEach(aquarium => {

            grid.appendChild(
                createCard(aquarium)
            );

        });

        container.appendChild(grid);

    }

    /*
    ===========================================
     Aquariumkarte
    ===========================================
    */

    function createCard(aquarium) {

        const card = document.createElement("article");

        card.className = "aquarium-card";

        const health =
            Data.calculateHealth(aquarium);

        const maintenance =
            getTopMaintenance(aquarium);

        card.innerHTML = `

            <div class="aquarium-photo">

                ${renderPhoto(aquarium)}

            </div>

            <div class="aquarium-body">

                <h2>

                    ${escapeHtml(aquarium.name)}

                </h2>

                <p>

                    📍 ${escapeHtml(
                        aquarium.location || "Kein Standort"
                    )}

                </p>

                <p>

                    💧 ${aquarium.volume} Liter

                </p>

                <div class="health">

                    ❤️ ${health} %

                </div>

                <div class="maintenance">

                    ${maintenance}

                </div>

                <div class="card-actions">

                    <button
                        class="button button-primary open-aquarium"
                        data-id="${aquarium.id}">

                        Aquarium öffnen

                    </button>

                    <button
                        class="button button-secondary edit-aquarium"
                        data-id="${aquarium.id}">

                        Bearbeiten

                    </button>

                </div>

            </div>

        `;

        card
            .querySelector(".open-aquarium")
            .addEventListener("click", () => {

                open(aquarium.id);

            });

        card
            .querySelector(".edit-aquarium")
            .addEventListener("click", () => {

                if (typeof UI.showAquariumDialog === "function") {

                    UI.showAquariumDialog(aquarium);

                }

            });

        return card;

    }

    /*
    ===========================================
     Aquariumfoto
    ===========================================
    */

    function renderPhoto(aquarium) {

        if (aquarium.photo) {

            return `

                <img
                    src="${aquarium.photo}"
                    alt="${escapeHtml(aquarium.name)}">

            `;

        }

        return `

            <span class="material-symbols-rounded">

                aquarium

            </span>

        `;

    }
     /*
    ===========================================
     Aquarium öffnen
    ===========================================
    */

    function open(id) {

        const aquarium = Data.getAquarium(id);

        if (!aquarium)
            return;

        renderDetail(aquarium);

    }

    /*
    ===========================================
     Detailansicht
    ===========================================
    */

    function renderDetail(aquarium) {

        container.innerHTML = "";

        const health =
            Data.calculateHealth(aquarium);

        const page =
            document.createElement("section");

        page.className =
            "aquarium-detail";

        page.innerHTML = `

            <button
                class="button button-secondary back-button">

                ← Dashboard

            </button>

            <div class="detail-header">

                <div class="detail-photo">

                    ${renderPhoto(aquarium)}

                </div>

                <h1>

                    ${escapeHtml(aquarium.name)}

                </h1>

                <p>

                    📍 ${escapeHtml(
                        aquarium.location || "Kein Standort"
                    )}

                </p>

                <p>

                    💧 ${aquarium.volume} Liter

                </p>

                <div class="health">

                    ❤️ ${health} %

                </div>

            </div>

            <section class="detail-section">

                <h2>

                    Wartungen

                </h2>

                ${createMaintenanceList(aquarium)}

            </section>

            <section class="detail-section">

                <h2>

                    Schnellzugriff

                </h2>

                <div class="quick-grid">

                    <button class="button">

                        💧 Wasserwechsel

                    </button>

                    <button class="button">

                        🌿 Düngung

                    </button>

                    <button class="button">

                        🧪 Wasserwerte

                    </button>

                    <button class="button">

                        🧽 Filter

                    </button>

                </div>

            </section>

        `;

        container.appendChild(page);

        page.querySelector(".back-button")
            .addEventListener("click", render);

    }

    /*
    ===========================================
     Wartungsliste
    ===========================================
    */

    function createMaintenanceList(aquarium) {

        return aquarium.maintenance

            .filter(task => task.enabled)

            .map(task => {

                const status =
                    Data.getMaintenanceStatus(task);

                const state =
                    status.due
                        ? `<span class="danger">
                                Überfällig
                           </span>`
                        : `<span class="success">
                                OK
                           </span>`;

                return `

                    <div class="maintenance-item">

                        <div>

                            <strong>

                                ${icon(task.id)}
                                ${escapeHtml(task.name)}

                            </strong>

                            <br>

                            Alle
                            ${task.interval}
                            Tage

                        </div>

                        <div>

                            ${state}

                        </div>

                    </div>

                `;

            })

            .join("");

    }
     /*
    ===========================================
     Dashboard-Wartungen
    ===========================================
    */

    function getTopMaintenance(aquarium) {

        return aquarium.maintenance

            .filter(task => task.enabled)

            .slice(0, 4)

            .map(task => {

                const status =
                    Data.getMaintenanceStatus(task);

                let text = "";

                if (status.overdue > 0) {

                    text = `⚠️ +${status.overdue} Tage`;

                } else {

                    const remaining =
                        Math.max(
                            0,
                            task.interval - status.days
                        );

                    text = remaining === 0
                        ? "Heute"
                        : `Noch ${remaining} Tage`;

                }

                return `

                    <div class="maintenance-row">

                        <span>

                            ${icon(task.id)}
                            ${escapeHtml(task.name)}

                        </span>

                        <strong>

                            ${text}

                        </strong>

                    </div>

                `;

            })

            .join("");

    }

    /*
    ===========================================
     Icons
    ===========================================
    */

    function icon(id) {

        switch (id) {

            case "water-change":
                return "💧";

            case "fertilizer":
                return "🌿";

            case "filter":
                return "🧽";

            case "water-test":
                return "🧪";

            default:
                return "📋";

        }

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

        render,

        open

    };

})();
