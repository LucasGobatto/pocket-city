import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialprofit, initialprofitRate } from "./constants";

@Service()
export class SchoolBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.school,
      element: BuildNames.school,
      fee: initialFee.school,
      icon: BuildingIcons.school,
      price: initialPrice.school,
      initialprofit: initialprofit.school,
      increaseprofitRate: initialprofitRate.school,
      maintainerProps: {
        description: "Description to school",
        icon: BuildingIcons.school,
        price: initialPrice.school * 100,
        title: "School Maintainer",
        wasBought: false,
      },
    });
  }
}
