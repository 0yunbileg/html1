let missions = new Array();
const upcomingContainer = document.querySelector(".upcomingMissionsWrapper");
const pastContainer = document.querySelector(".pastMissionsWrapper");


async function getMissions() {
    const res = await fetch("https://api.spacexdata.com/v5/launches");
    if (!res.ok) throw new Error("Missions not found, API wrong");
    const data = await res.json();
    missions = data;
    return missions; 
}

getMissions().then(missions => {
    const upcomingMissions = missions.filter(mission => mission.upcoming);
    const pastMissions = missions.filter(mission => !mission.upcoming);

    upcomingMissions.forEach(mission => {
        const list = document.createElement("div");
        list.classList.add("missionWrapper");
        list.innerHTML = displayMissionCard(mission);
        upcomingContainer.appendChild(list);
    });

    pastMissions.forEach(mission => {
        const list = document.createElement("div");
        list.classList.add("missionWrapper");
        list.innerHTML = displayMissionCard(mission);
        pastContainer.appendChild(list);
    });
});

function displayMissionCard(mission) {
    const text = `
            <div class="overlayWrapper">
                <div class="detailsDiv" onclick="displaymissionDetail('${mission.id}')">
                    <p class="titleD">${mission.name} (${mission.static_fire_date_utc})</p>
                </div>
            </div>
            `;
            console.log(text, "text")
    return text;
}
