let missions = new Array();
const upcomingContainer = document.querySelector(".upcomingMissionsDiv");
const pastContainer = document.querySelector(".pastMissionsDiv");


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
        const list = document.createElement("tr");
        list.classList.add("missionWrapper");
        list.innerHTML = displayMissionCard(mission);
        upcomingContainer.appendChild(list);
    });

    pastMissions.forEach(mission => {
        const list = document.createElement("tr");
        list.classList.add("missionWrapper");
        list.innerHTML = displayMissionCard(mission);
        pastContainer.appendChild(list);
    });
});

function displayMissionCard(mission) {
    const linksArray = Object.values(mission.links);
    const connectionLink = linksArray.find(link => typeof(link) == "string")
    const text = `
            <td>${mission.name}</td>
            <td>${mission.date_utc}</td>
            <td>${mission.flight_number}</td>
            <td><a href="${connectionLink}">${connectionLink}</a></td>
            `;
    return text;
}
