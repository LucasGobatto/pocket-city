import { BuildingIcons } from "../../assets";
import { Build } from "../models";
import { factoryButton } from "../tags";
import { BasicBuild } from "./basic-build";

export class FactoryBuild extends BasicBuild implements Build {
  constructor(price = 50) {
    super(0, price, 1.4, 2, null, "factory");
  }

  getButton() {
    return factoryButton;
  }

  addBuild() {
    const lenght = BuildingIcons.factory.length - 1;
    const icon = BuildingIcons.factory[Number((Math.random() * lenght).toFixed(0))];

    super.addBuild(this.entity, icon);

    return this;
  }

  setActive(active: boolean) {
    super.setActive(active, "factory");
  }
}
