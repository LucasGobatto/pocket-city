import { FactoryBuild, HouseBuild } from "./buildings";
import { RateController } from "./controler";
import { Build } from "./models";
import { currentDayDisplay, factoryButton, houseButton, moneyDisplay, populationDisplay } from "./tags";

export class PocketCityGame {
  private gameTicker: number;
  private population = {
    total: 0,
    adults: 0,
    children: 0,
  };
  private money = 200;
  private day: number;
  private profite = {
    day: 1,
    citizen: 0.4,
  };

  private houseBuild: HouseBuild;
  private factoryBuild: FactoryBuild;

  constructor(gameTicker: number) {
    this.gameTicker = gameTicker;

    this.houseBuild = new HouseBuild();
    this.factoryBuild = new FactoryBuild();

    this.addEventListeners();
  }

  async run() {
    for (let day = 1; true; day++) {
      this.day = day;

      this.updatePopulationRate();
      this.increaseMoney();
      this.diplayUpdatedData();
      this.verifyBudgetAndUpdateButtons();

      await this.sleep();
    }
  }

  private increaseMoney() {
    if (this.day % 7 === 0) {
      this.money += this.houseBuild.getProfite() + this.factoryBuild.getProfite();
      this.money += this.profite.day;
      this.money += this.population.total * this.profite.citizen;
    }
  }

  private updatePopulationRate() {
    if (this.day % 60 === 0) {
      this.population.adults -= RateController.deathRateController(this.population.adults);
    }

    if (this.day % 30 === 0) {
      this.population.adults += this.population.children;
      this.population.children = RateController.birthRateController(this.population.adults - this.population.children);
    }

    this.population.total = Number((this.population.adults + this.population.children).toFixed(0));
  }

  private diplayUpdatedData() {
    currentDayDisplay.innerHTML = `Day ${this.day}`;
    moneyDisplay.innerHTML = `$ ${this.money.toFixed(2)}`;
    populationDisplay.innerHTML = `Population: ${this.population.total}`;
  }

  private verifyBudgetAndUpdateButtons() {
    const buildings = [this.factoryBuild, this.houseBuild];

    for (const building of buildings) {
      const buildPrice = building.getPrice();

      const hasMoneyToBuild = this.money >= buildPrice;

      building.setActive(hasMoneyToBuild);
    }
  }

  private addEventListeners() {
    houseButton.addEventListener("click", () => {
      this.addBuildingEntity(this.houseBuild);
    });
    factoryButton.addEventListener("click", () => {
      this.addBuildingEntity(this.factoryBuild);
    });
  }

  private addBuildingEntity(building: Build) {
    const price = building.getPrice();
    const { money, population } = this;

    if (money < price) {
      console.log("not enough money");
      return;
    }

    building.addBuild();

    const newStatus = building.updateCityStatus({ money, population });
    this.money = newStatus.money;
    this.population = { ...this.population, ...newStatus.population };

    building.applyFee();
    building.updatePriceLabel();

    this.verifyBudgetAndUpdateButtons();
  }

  private sleep(): Promise<void> {
    return new Promise((res) => setTimeout(() => res(), this.gameTicker));
  }
}
