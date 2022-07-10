import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { initialFee, initialPrice, initialProfite, initialProfiteRate } from "./constants";

@Service()
export class AirportBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: 36000,
      element: BuildNames.airport,
      fee: initialFee.airport,
      icon: BuildingIcons.airport,
      increaseProfiteRate: initialProfiteRate.airport,
      initialProfite: initialProfite.airport,
      price: initialPrice.airport,
    });
  }
}
