import { Service } from "typedi";
import { FactoryBuild, HouseBuild, ShopBuild } from "../buildings";
import { Build } from "../models";

@Service()
export class AddEventListenerController {
  private readonly buildings: Build[];

  constructor(
    private readonly houseBuild: HouseBuild,
    private readonly factoryBuild: FactoryBuild,
    private readonly shopBuild: ShopBuild
  ) {
    this.buildings = [this.houseBuild, this.factoryBuild, this.shopBuild];
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
