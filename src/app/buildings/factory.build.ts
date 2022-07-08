import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialProfiteRate, initialPrice, initialFee } from "./constants";

@Service()
export class FactoryBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: 10,
      element: BuildNames.factory,
      fee: initialFee.factory,
      price: initialPrice.factory,
      initialProfite: 15,
      increaseProfiteRate: initialProfiteRate.factory,
      icon: BuildingIcons.factory,
    });
  }
}
