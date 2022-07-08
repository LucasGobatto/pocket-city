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
      const housePrice = this.houseBuild.getPrice();
      const factoryPrice = this.factoryBuild.getPrice();
      const shopPrice = this.shopBuild.getPrice();

      const gameMoney = GameStats.money;

      this.houseBuild.setActive(housePrice <= gameMoney);
      this.factoryBuild.setActive(factoryPrice <= gameMoney);
      this.shopBuild.setActive(shopPrice <= gameMoney);
    }, GameStats.gameTicker);
  }
}
