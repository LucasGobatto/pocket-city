import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialprofit, initialprofitRate } from "./constants";

@Service()
export class CityHallBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.cityHall,
      element: BuildNames.cityHall,
      fee: initialFee.cityHall,
      icon: BuildingIcons.cityHall,
      increaseprofitRate: initialprofitRate.cityHall,
      initialprofit: initialprofit.cityHall,
      price: initialPrice.cityHall,
      maintainerProps: {
        description: "Description to city hall",
        icon: BuildingIcons.cityHall,
        price: initialPrice.cityHall * 100,
        title: "City Hall Maintainer",
        wasBought: false,
      },
    });
  }
}
