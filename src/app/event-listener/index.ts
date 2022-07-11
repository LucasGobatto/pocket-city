import { Service } from "typedi";
import {
  AirportBuild,
  ChurchBuild,
  FactoryBuild,
  HouseBuild,
  MallBuild,
  PublicTransportBuild,
  SchoolBuild,
  ShopBuild,
  UsineBuild,
  CityHallBuild,
} from "../buildings";
import { GameStats } from "../game-stats";
import { Build } from "../models";
import { menuItemsButtons, multiplierButton } from "../tags";
import { MaintainersWindowsEvent } from "./events/open-maintainers-windown.event";
import { RenderCards } from "./render-cards";

@Service()
export class AddEventListenerController {
  private readonly buildings: Build[];

  constructor(
    private readonly houseBuild: HouseBuild,
    private readonly factoryBuild: FactoryBuild,
    private readonly shopBuild: ShopBuild,
    private readonly schoolBuild: SchoolBuild,
    private readonly publicTransportBuild: PublicTransportBuild,
    private readonly usineBuild: UsineBuild,
    private readonly churchBuild: ChurchBuild,
    private readonly mallBuild: MallBuild,
    private readonly airportBuild: AirportBuild,
    private readonly cityHallBuild: CityHallBuild,
    private readonly maintainersWindowsEvent: MaintainersWindowsEvent,
    private readonly renderMaintainerCards: RenderCards
  ) {
    this.buildings = [
      this.houseBuild,
      this.factoryBuild,
      this.shopBuild,
      this.schoolBuild,
      this.publicTransportBuild,
      this.usineBuild,
      this.churchBuild,
      this.mallBuild,
      this.airportBuild,
      this.cityHallBuild,
    ];
  }

  addEventListeners() {
    this.buildings.forEach((build) => {
      build.getButton().addEventListener("click", () => {
        build.addBuild();
      });

      build.getPurchaseIconButton().addEventListener("click", () => {
        build.getMoney();
      });
    });

    multiplierButton.addEventListener("click", () => {
      GameStats.updateMultiplePurchaseValue();
      this.buildings.forEach((build) => build.setMultiplePurchaseValue());
    });

    menuItemsButtons.maintainers.addEventListener("click", () => {
      if (!this.maintainersWindowsEvent.isOpen) {
        this.renderMaintainerCards.render(this.getCards());
      }

      this.maintainersWindowsEvent.open();
    });

    menuItemsButtons.closeMaintainersWindow.addEventListener("click", () => {
      this.maintainersWindowsEvent.close();
      this.renderMaintainerCards.unrender();
    });
  }

  private getCards() {
    return this.buildings.map((build) => build.getMaintainerCardProps());
  }
}
