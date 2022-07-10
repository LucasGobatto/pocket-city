import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialProfite, initialProfiteRate } from "./constants";

@Service()
export class SchoolBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.school,
      element: BuildNames.school,
      fee: initialFee.school,
      icon: BuildingIcons.school,
      price: initialPrice.school,
      initialProfite: initialProfite.school,
      increaseProfiteRate: initialProfiteRate.school,
    });
  }
}
