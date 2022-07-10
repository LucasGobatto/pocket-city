import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialFee, initialPrice, initialProfite, initialProfiteRate } from "./constants";

@Service()
export class MallBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: 18000,
      element: BuildNames.mall,
      fee: initialFee.mall,
      icon: BuildingIcons.mall,
      increaseProfiteRate: initialProfiteRate.mall,
      initialProfite: initialProfite.mall,
      price: initialPrice.mall,
      maintainerProps: {
        description: "Description to mall",
        icon: BuildingIcons.mall,
        price: initialPrice.mall * 100,
        title: "Mall Maintainer",
        wasBought: false,
      },
    });
  }
}
