import { FactoryBuild, HouseBuild } from "./buildings";
import { BudgetController, EventListenerController, RateController } from "./controllers";
import { GameStats } from "./game-stats";
import { currentDayDisplay, moneyDisplay, populationDisplay, weekProfite } from "./tags";

export class PocketCityGame {
  private readonly houseBuild: HouseBuild;
  private readonly factoryBuild: FactoryBuild;

  constructor(gameTicker: number) {
    GameStats.gameTicker = gameTicker;

    this.houseBuild = new HouseBuild();
    this.factoryBuild = new FactoryBuild();

    const eventListenerController = new EventListenerController(this.houseBuild, this.factoryBuild);
    eventListenerController.addEventListeners();
  }

  async run() {
    for (let day = 1; true; day++) {
      GameStats.day = day;

      this.incresePopulation();
      this.increaseMoney();
      this.diplayUpdatedData();
      this.updateWeekProfite();
      BudgetController.verifyBudgetAndUpdateButtons([this.houseBuild, this.factoryBuild]);

      await this.sleep();
    }
  }

  private increaseMoney() {
    if (GameStats.day % 7 === 0) {
      GameStats.money += this.houseBuild.getProfite() + this.factoryBuild.getProfite();
      GameStats.money += GameStats.profite.day;
      GameStats.money += GameStats.population.total * GameStats.profite.citizens;
    }
  }

  private updateWeekProfite() {
    console.log({
      house: this.houseBuild.getProfite(),
      factory: this.factoryBuild.getProfite(),
      day: GameStats.profite.day,
      citizens: GameStats.population.total * GameStats.profite.citizens,
    });
    const profite = (
      this.houseBuild.getProfite() +
      this.factoryBuild.getProfite() +
      GameStats.profite.day +
      GameStats.population.total * GameStats.profite.citizens
    ).toFixed(2);

    weekProfite.innerHTML = `+$ ${profite} / week`;
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
