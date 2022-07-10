import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialProfite, initialProfiteRate } from "./constants";

@Service()
export class CityHallBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.cityHall,
      element: BuildNames.cityHall,
      fee: initialFee.cityHall,
      icon: BuildingIcons.cityHall,
      increaseProfiteRate: initialProfiteRate.cityHall,
      initialProfite: initialProfite.cityHall,
      price: initialPrice.cityHall,
    });
  }
}
