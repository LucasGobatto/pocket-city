import "reflect-metadata";

import { Container } from "typedi";

import "../components/styles/global.style.css";
import "../components/styles/main-session.style.css";
import "../components/styles/purchase-buttons.style.css";

import { PocketCityGame } from "./game";

const game = Container.get(PocketCityGame);

window.addEventListener("load", async () => {
  await game.run();
});
