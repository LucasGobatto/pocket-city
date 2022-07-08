import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";

@Service()
export class FactoryBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: 10,
      element: BuildNames.factory,
      fee: 1.088,
      price: 50,
      initialProfite: 15,
      increaseProfiteRate: 1.02,
      icon: BuildingIcons.factory,
    });
  }
}
