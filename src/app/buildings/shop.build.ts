import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialProfiteRate, initialPrice, initialFee } from "./constants";

@Service()
export class ShopBuild extends BaseBuild {
  constructor() {
    super({
      element: BuildNames.shop,
      price: initialPrice.shop,
      initialProfite: 120,
      increaseProfiteRate: initialProfiteRate.shop,
      fee: initialFee.shop,
      animationTime: 30,
      icon: BuildingIcons.shop,
    });
  }
}
