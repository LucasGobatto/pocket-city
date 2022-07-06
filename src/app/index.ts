import { PocketCityGame } from "./game";

import "../components/styles/global.style.css";
import "../components/styles/main-session.style.css";
import "../components/styles/purchase-buttons.style.css";

const game = new PocketCityGame();

window.addEventListener("DOMContentLoaded", async () => {
  await game.run();
});
