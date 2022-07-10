import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialProfite, initialProfiteRate } from "./constants";

@Service()
export class UsineBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.usine,
      element: BuildNames.usine,
      fee: initialFee.usine,
      icon: BuildingIcons.usine,
      increaseProfiteRate: initialProfiteRate.usine,
      initialProfite: initialProfite.usine,
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
