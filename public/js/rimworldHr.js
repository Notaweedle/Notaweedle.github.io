const API_KEY = "YOUR_API_KEY";
const STEAM_ID = "YOUR_STEAM_ID64";
const APP_ID = 294100;

async function getRimworldHours() {
    const url =
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/` +
        `?key=${API_KEY}` +
        `&steamid=${STEAM_ID}` +
        `&include_appinfo=true`;

    const response = await fetch(url);
    const data = await response.json();

    const games = data.response.games;

    const rimworld = games.find(game => game.appid === APP_ID);

    if (!rimworld) {
        console.log("RimWorld not found");
        return;
    }

    const minutes = rimworld.playtime_forever;
    const hours = (minutes / 60).toFixed(1);

    console.log(`RimWorld playtime: ${hours} hours`);
}

getRimworldHours();