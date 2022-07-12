import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialprofit, initialprofitRate } from "./constants";

@Service()
export class UsineBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.usine,
      element: BuildNames.usine,
      fee: initialFee.usine,
      icon: BuildingIcons.usine,
      increaseprofitRate: initialprofitRate.usine,
      initialprofit: initialprofit.usine,
      price: initialPrice.usine,
      maintainerProps: {
        description: "Description to usine",
        icon: BuildingIcons.usine,
        price: initialPrice.usine * 100,
        title: "Usine Maintainer",
        wasBought: false,
      },
    });
  }
}
