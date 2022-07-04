import { Build } from "../models";
import { BasicBuild } from "./basic-build";

export class FactoryBuild extends BasicBuild implements Build {
  constructor(price = 50) {
    super(0, price, 1.4, 2, null, "factory");
  }

  addBuild() {
    super.addBuild(this.entity);

    return this;
  }

  setActive(active: boolean) {
    super.setActive(active, "factory");
  }
}
