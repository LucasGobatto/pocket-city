import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialProfiteRate, initialPrice, initialFee, initialProfite } from "./constants";

@Service()
export class HouseBuild extends BaseBuild {
  constructor() {
    super({
      element: BuildNames.house,
      price: initialPrice.house,
      initialProfite: initialProfite.house,
      increaseProfiteRate: initialProfiteRate.house,
      fee: initialFee.house,
      animationTime: 3,
      icon: BuildingIcons.house,
      isInitialActive: true,
    });
  }

  getProfite() {
    return this.amount > 1 ? this.amount * this.initialProfite * this.increaseProfiteRate : this.initialProfite;
  }
}
