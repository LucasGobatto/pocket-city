import "reflect-metadata";

import { Container } from "typedi";

import "../components/styles/global.style.css";
import "../components/styles/main-section.style.css";
import "../components/styles/menu.style.css";
import "../components/styles/maintainer-menu.style.css";
import "../components/styles/purchase-buttons.style.css";

import { PocketCityGame } from "./game";

const game = Container.get(PocketCityGame);

window.addEventListener("load", async () => {
  await game.run();
});
