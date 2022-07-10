import { Service } from "typedi";
import { FactoryBuild, HouseBuild, ShopBuild } from "./buildings";
import { AddEventListenerController } from "./event-listener";
import { GameStats } from "./game-stats";

@Service()
export class PocketCityGame {
  constructor(
    private readonly addEventListenerController: AddEventListenerController,
    private readonly houseBuild: HouseBuild,
    private readonly factoryBuild: FactoryBuild,
    private readonly shopBuild: ShopBuild
  ) {
    this.addEventListenerController.addEventListeners();
    GameStats.updateMoney(0);
  }

  async run() {
    setInterval(() => {
      this.houseBuild.observerMoneyAndSetActive();
      this.factoryBuild.observerMoneyAndSetActive();
      this.shopBuild.observerMoneyAndSetActive();
    }, GameStats.gameTicker);
  }
}
