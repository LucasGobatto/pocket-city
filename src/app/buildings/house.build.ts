import { BuildingIcons } from "../../assets";
import { Build } from "../models";
import { houseButton } from "../tags";
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

  getButton() {
    return houseButton;
  }

  addBuild() {
    const lenght = BuildingIcons.house.length - 1;

    const icon = BuildingIcons.house[Math.round(Math.random() * lenght)];
    super.addBuild(this.entity, icon);

    return this;
  }

  setActive(active: boolean) {
    super.setActive(active, "house");
  }
}
