import { Build } from "../models";
import { BasicBuild } from "./basic-build";

export class HouseBuild extends BasicBuild implements Build {
  constructor(price = 5) {
    super(
      0,
      price,
      1.2,
      0.2,
      {
        children: 2,
        adults: 2,
        total: 4,
      },
      "house"
    );
  }

  addBuild() {
    super.addBuild(this.entity);

    return this;
  }

  setActive(active: boolean) {
    super.setActive(active, "house");
  }
}
