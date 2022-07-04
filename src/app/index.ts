import "../components/styles/factory.style.css";
import "../components/styles/house.style.css";
import "../components/styles/main-session.style.css";
import "../components/styles/neighborhood.style.css";
import "../components/styles/purchase-buttons.style.css";
import "../components/styles/global.css";

import { PocketCityGame } from "./game";

const gameTicker = 1250;

const game = new PocketCityGame(gameTicker);

window.addEventListener("DOMContentLoaded", async () => {
  await game.run();
});
