import { Service } from "typedi";
import { BuildingIcons } from "../../assets";
import { BuildNames } from "../models";
import { BaseBuild } from "./base.build";
import { animationTime, initialFee, initialPrice, initialprofit, initialprofitRate } from "./constants";

@Service()
export class PublicTransportBuild extends BaseBuild {
  constructor() {
    super({
      animationTime: animationTime.publicTransport,
      element: BuildNames.publicTransport,
      fee: initialFee.publicTransport,
      icon: BuildingIcons.publicTransport,
      increaseprofitRate: initialprofitRate.publicTransport,
      initialprofit: initialprofit.publicTransport,
      price: initialPrice.publicTransport,
      maintainerProps: {
        description: "Description to public transport",
        icon: BuildingIcons.publicTransport,
        price: initialPrice.publicTransport * 100,
        title: "Public Transport Maintainer",
        wasBought: false,
      },
    });
  }
}
