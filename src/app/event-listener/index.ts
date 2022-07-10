import { Service } from "typedi";
import {
  AirportBuild,
  ChurchBuild,
  FactoryBuild,
  HouseBuild,
  MallBuild,
  PublicTransportBuild,
  SchoolBuild,
  ShopBuild,
  UsineBuild,
  CityHallBuild,
} from "../buildings";
import { Build } from "../models";

@Service()
export class AddEventListenerController {
  private readonly buildings: Build[];

  constructor(
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
    this.buildings = [
      this.houseBuild,
      this.factoryBuild,
      this.shopBuild,
      this.schoolBuild,
      this.publicTransportBuild,
      this.usineBuild,
    ];
  }

  addEventListeners() {
    this.buildings.forEach((build) => {
      build.getButton().addEventListener("click", () => {
        build.addBuild();
      });

      build.getPurchaseIconButton().addEventListener("click", () => {
        build.getMoney();
      });

      build.getMultiplePurchaseButton().addEventListener("click", () => {
        build.setMultiplePurchaseValue();
      });
    });
  }
}
