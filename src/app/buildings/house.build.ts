import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialProfiteRate, initialPrice, initialFee, initialProfite, animationTime } from "./constants";

@Service()
export class HouseBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.house,
      element: BuildNames.house,
      price: initialPrice.house,
      initialProfite: initialProfite.house,
      increaseProfiteRate: initialProfiteRate.house,
      fee: initialFee.house,
      icon: BuildingIcons.house,
      isInitialActive: true,
    });
  }

  getProfite() {
    return this.amount > 1 ? this.amount * this.initialProfite * this.increaseProfiteRate : this.initialProfite;
  }
}
