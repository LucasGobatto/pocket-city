import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";

@Service()
export class HouseBuild extends BaseBuild {
  constructor() {
    super({
      element: BuildNames.house,
      price: 5,
      initialProfite: 1,
      increaseProfiteRate: 1,
      fee: 1.069,
      animationTime: 3,
      icon: BuildingIcons.house,
      isInitialActive: true,
    });
  }
}
