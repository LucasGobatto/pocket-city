import { Service } from "typedi";
import { FactoryBuild, HouseBuild } from "./buildings";
import { AddEventListenerController } from "./event-listener";
import { GameStats } from "./game-stats";

@Service()
export class PocketCityGame {
  constructor(
    private readonly addEventListenerController: AddEventListenerController,
    private readonly houseBuild: HouseBuild,
    private readonly factoryBuild: FactoryBuild
  ) {
    this.addEventListenerController.addEventListeners();
    GameStats.updateMoney(0);
  }

  async run() {
    setInterval(() => {
      const factoryPrice = this.factoryBuild.getPrice();
      const housePrice = this.houseBuild.getPrice();
      const gameMoney = GameStats.money;

      this.houseBuild.setActive(housePrice <= gameMoney);
      this.factoryBuild.setActive(factoryPrice <= gameMoney);
    }, GameStats.gameTicker);
  }
}
