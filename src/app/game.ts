import { FactoryBuild, HouseBuild } from "./buildings";
import { BudgetController, EventListenerController, RateController } from "./controllers";
import { GameStats } from "./game-stats";
import { Build } from "./models";
import { currentDayDisplay, moneyDisplay, populationDisplay } from "./tags";

export class PocketCityGame {
  private readonly houseBuild: HouseBuild;
  private readonly factoryBuild: FactoryBuild;
  private readonly buildings: Build[];

  constructor(gameTicker: number) {
    GameStats.gameTicker = gameTicker;

    this.houseBuild = new HouseBuild();
    this.factoryBuild = new FactoryBuild();

    this.buildings = [this.houseBuild, this.factoryBuild];

    const eventListenerController = new EventListenerController(this.buildings);
    eventListenerController.addEventListeners();
  }

  async run() {
    for (let day = 1; true; day++) {
      GameStats.day = day;

      this.incresePopulation();
      this.increaseMoney();
      this.diplayUpdatedData();
      BudgetController.updateWeekProfite(this.buildings);
      BudgetController.verifyBudgetAndUpdateButtons(this.buildings);

      await this.sleep();
    }
  }

  private increaseMoney() {
    if (GameStats.day % 7 === 0) {
      GameStats.money += this.buildings.reduce((concat, build) => (concat += build.getProfite()), 0);
      GameStats.money += GameStats.profite.day;
      GameStats.money += GameStats.population.total * GameStats.profite.citizens;
    }
  }

  private incresePopulation() {
    if (GameStats.day % 60 === 0) {
      GameStats.population.adults -= RateController.deathRateController(GameStats.population.adults);
    }

    if (GameStats.day % 30 === 0) {
      GameStats.population.adults += GameStats.population.children;
      GameStats.population.children = RateController.birthRateController(
        GameStats.population.adults - GameStats.population.children
      );
    }

    GameStats.population.total = Number((GameStats.population.adults + GameStats.population.children).toFixed(0));
  }

  private diplayUpdatedData() {
    currentDayDisplay.innerHTML = `Day ${GameStats.day}`;
    moneyDisplay.innerHTML = `$ ${GameStats.money.toFixed(2)}`;
    populationDisplay.innerHTML = `Population: ${GameStats.population.total}`;
  }

  private sleep(): Promise<void> {
    return new Promise((res) => setTimeout(() => res(), GameStats.gameTicker));
  }
}
