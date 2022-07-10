import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialProfiteRate, initialPrice, initialFee, initialProfite, animationTime } from "./constants";

@Service()
export class ShopBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.shop,
      element: BuildNames.shop,
      price: initialPrice.shop,
      initialProfite: initialProfite.shop,
      increaseProfiteRate: initialProfiteRate.shop,
      fee: initialFee.shop,
      icon: BuildingIcons.shop,
    });
  }
}
