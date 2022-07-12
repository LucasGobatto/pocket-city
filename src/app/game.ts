import { Service } from "typedi";
import {
  FactoryBuild,
  HouseBuild,
  SchoolBuild,
  ShopBuild,
  PublicTransportBuild,
  UsineBuild,
  AirportBuild,
  ChurchBuild,
  MallBuild,
  CityHallBuild,
} from "./buildings";
import { AddEventListenerController } from "./event-listener";
import { GameStats } from "./game-stats";

@Service()
export class PocketCityGame {
  constructor(
    private readonly addEventListenerController: AddEventListenerController,
    private readonly houseBuild: HouseBuild,
    private readonly factoryBuild: FactoryBuild,
    private readonly shopBuild: ShopBuild,
    private readonly schoolBuild: SchoolBuild,
    private readonly publicTransportBuild: PublicTransportBuild,
    private readonly usineBuild: UsineBuild,
    private readonly churchBuild: ChurchBuild,
    private readonly mallBuild: MallBuild,
    private readonly airportBuild: AirportBuild,
    private readonly cityHallBuild: CityHallBuild
  ) {
    this.addEventListenerController.addEventListeners();
    GameStats.updateMoney();
  }

  async run() {
    setInterval(() => {
      this.houseBuild.observerMoneyAndSetActive();
      this.factoryBuild.observerMoneyAndSetActive();
      this.shopBuild.observerMoneyAndSetActive();
      this.schoolBuild.observerMoneyAndSetActive();
      this.publicTransportBuild.observerMoneyAndSetActive();
      this.usineBuild.observerMoneyAndSetActive();
      this.churchBuild.observerMoneyAndSetActive();
      this.mallBuild.observerMoneyAndSetActive();
      this.airportBuild.observerMoneyAndSetActive();
      this.cityHallBuild.observerMoneyAndSetActive();
    }, GameStats.gameTicker);
  }
}
