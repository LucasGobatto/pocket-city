import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialprofitRate, initialPrice, initialFee, initialprofit, animationTime } from "./constants";

@Service()
export class ShopBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.shop,
      element: BuildNames.shop,
      price: initialPrice.shop,
      initialprofit: initialprofit.shop,
      increaseprofitRate: initialprofitRate.shop,
      fee: initialFee.shop,
      icon: BuildingIcons.shop,
      maintainerProps: {
        description: "Description to shop",
        icon: BuildingIcons.shop,
        price: initialPrice.shop * 100,
        title: "Shop Maintainer",
        wasBought: false,
      },
    });
  }
}
