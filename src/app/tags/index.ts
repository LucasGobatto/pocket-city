export const moneyDisplay = document.querySelector(".wallet-money");
export const currentDayDisplay = document.querySelector(".current-day");
export const populationDisplay = document.querySelector(".population");

export const neighborhood = document.querySelector(".neighborhood");
const houseButton: HTMLButtonElement = document.querySelector("#house-button");
const factoryButton: HTMLButtonElement = document.querySelector("#factory-button");
const shopButton: HTMLButtonElement = document.querySelector("#shop-button");
const schoolButton: HTMLButtonElement = document.querySelector("#school-button");
const publicTransportButton: HTMLButtonElement = document.querySelector("#public-transport-button");
const usineButton: HTMLButtonElement = document.querySelector("#usine-button");
const churchButton: HTMLButtonElement = document.querySelector("#church-button");
const mallButton: HTMLButtonElement = document.querySelector("#mall-button");
const airportButton: HTMLButtonElement = document.querySelector("#airport-button");
const cityHallButton: HTMLButtonElement = document.querySelector("#city-hall-button");

export const htmlButtons: Record<string, HTMLButtonElement> = {
  ["house-buttons"]: houseButton,
  ["factory-buttons"]: factoryButton,
  ["shop-buttons"]: shopButton,
  ["school-buttons"]: schoolButton,
  ["public-transport-buttons"]: publicTransportButton,
  ["usine-buttons"]: usineButton,
  ["church-buttons"]: churchButton,
  ["mall-buttons"]: mallButton,
  ["airport-buttons"]: airportButton,
  ["city-hall-buttons"]: cityHallButton,
};
