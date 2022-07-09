import { Service } from "typedi";
import { FactoryBuild, HouseBuild, ShopBuild } from "./buildings";
import { AddEventListenerController } from "./event-listener";
import { GameStats } from "./game-stats";
import { setElementActive } from "./utils";

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

      const houseButton = this.houseBuild.getButton();
      const factoryButton = this.factoryBuild.getButton();
      const shopButton = this.shopBuild.getButton();

      setElementActive(houseButton, housePrice <= gameMoney);
      setElementActive(factoryButton, factoryPrice <= gameMoney);
      setElementActive(shopButton, shopPrice <= gameMoney);
    }, GameStats.gameTicker);
  }
}
