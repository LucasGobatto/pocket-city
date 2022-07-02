const moneyDisplay = document.querySelector(".wallet-money");
const currentDayDisplay = document.querySelector(".current-day");
const populationDisplay = document.querySelector(".population");

const houseButton = document.querySelector("#house-button");
const factoryButton = document.querySelector("#factory-button");

const houseBuild = new HouseBuild();
const factoryBuild = new FactoryBuild();

let cityStatus = {
  happiness: 100,
  population: {
    total: 0,
    adults: 0,
    children: 0,
  },
  money: 200,
  day: 0,
  profite: {
    day: 1,
  },
};

houseButton.addEventListener("click", () => {
  addBuildingEntity(houseBuild);
});
factoryButton.addEventListener("click", () => {
  addBuildingEntity(factoryBuild);
});

const addBuildingEntity = (building) => {
  const price = building.getPrice();

  if (cityStatus.money >= price) {
    building.addBuild();
    cityStatus = building.updateCityStatus(cityStatus);
    building.applyFee();
    building.updatePriceLabel();
  } else {
    console.log("not enough money");
  }
};

try {
  window.addEventListener("DOMContentLoaded", async () => {
    for (let timer = 1; true; timer++) {
      await spleep();

      increaseMoney(timer);
      diplayUpdatedData(timer);
    }
  });
} catch (e) {
  console.log("Game crashed", e);
}

const increaseMoney = (timer) => {
  if (timer % 5 === 0) {
    cityStatus.money += cityStatus.profite.day;
    cityStatus.money += houseBuild.getProfite() + factoryBuild.getProfite();
  }
};

const diplayUpdatedData = (timer) => {
  currentDayDisplay.innerHTML = `Day ${timer}`;
  moneyDisplay.innerHTML = `$ ${cityStatus.money.toFixed(2)}`;
  populationDisplay.innerHTML = `Population: ${cityStatus.population.total}`;
};

const gameTicker = 1500;

const spleep = async () => {
  return new Promise((res) => setTimeout(() => res(), gameTicker));
};
