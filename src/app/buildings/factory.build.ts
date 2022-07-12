import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialprofitRate, initialPrice, initialFee, initialprofit, animationTime } from "./constants";

@Service()
export class FactoryBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.factory,
      element: BuildNames.factory,
      fee: initialFee.factory,
      price: initialPrice.factory,
      initialprofit: initialprofit.factory,
      increaseprofitRate: initialprofitRate.factory,
      icon: BuildingIcons.factory,
      maintainerProps: {
        description: "Description to factory",
        icon: BuildingIcons.factory,
        price: initialPrice.factory * 10,
        title: "Factory Maintainer",
        wasBought: false,
      },
    });
  }
}
