import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialprofit, initialprofitRate } from "./constants";

@Service()
export class ChurchBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.church,
      element: BuildNames.church,
      fee: initialFee.church,
      icon: BuildingIcons.church,
      increaseprofitRate: initialprofitRate.church,
      initialprofit: initialprofit.church,
      price: initialPrice.church,
      maintainerProps: {
        description: "Description to church",
        icon: BuildingIcons.church,
        price: initialPrice.church * 100,
        title: "Church Maintainer",
        wasBought: false,
      },
    });
  }
}
