import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialprofitRate, initialPrice, initialFee, initialprofit, animationTime } from "./constants";

@Service()
export class HouseBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.house,
      element: BuildNames.house,
      price: initialPrice.house,
      initialprofit: initialprofit.house,
      increaseprofitRate: initialprofitRate.house,
      fee: initialFee.house,
      icon: BuildingIcons.house,
      isInitialActive: true,
      maintainerProps: {
        description: "Description to house",
        icon: BuildingIcons.house,
        price: initialPrice.house * 100,
        title: "House Keeper",
        wasBought: false,
      },
    });
  }

  getprofit() {
    return this.amount > 1 ? this.amount * this.initialprofit * this.increaseprofitRate : this.initialprofit;
  }
}
