import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialProfiteRate, initialPrice, initialFee, initialProfite, animationTime } from "./constants";

@Service()
export class FactoryBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.factory,
      element: BuildNames.factory,
      fee: initialFee.factory,
      price: initialPrice.factory,
      initialProfite: initialProfite.factory,
      increaseProfiteRate: initialProfiteRate.factory,
      icon: BuildingIcons.factory,
    });
  }
}
