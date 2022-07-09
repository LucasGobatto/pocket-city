import { AddAnimation } from "../event-listener/add-animation.event-listener";
import { GameStats } from "../game-stats";
import { Build, BuildNames } from "../models";
import { setElementActive } from "../utils";
import { moneyFormater } from "../utils/money-formater";

interface BuildProps {
  element: BuildNames;
  price: number;
  initialProfite: number;
  increaseProfiteRate: number;
  fee: number;
  animationTime: number;
  icon: string;
  isInitialActive?: boolean;
}

export abstract class BaseBuild implements Build {
  private readonly slider: HTMLDivElement;
  private readonly button: HTMLButtonElement;
  private readonly multipleButton: HTMLButtonElement;
  private readonly priceLabel: HTMLParagraphElement;
  private readonly profiteLabel: HTMLDivElement;
  private readonly buildingIcon: HTMLDivElement;
  private readonly progressBar: HTMLDivElement;
  private readonly buildingAmountLabel: HTMLParagraphElement;
  private readonly baseProgress = [10, 20, 50, 100, 150, 200, 300, 400, 500, 750, 1000];
  private readonly icon: any;

  private isActive: boolean;
  private price: number;
  private fee: number;
  private animationTime: number;
  private interval: NodeJS.Timeout;
  private hasImprover = false;

  protected readonly increaseProfiteRate: number;
  protected initialProfite: number;
  protected amount = 0;

  constructor(props: BuildProps) {
    const { element } = props;
    this.slider = document.querySelector(`.animated-slider#${element}-slider`);
    this.button = document.querySelector(`#${element}-button`);
    this.multipleButton = document.querySelector(`.building-amount#${element}`);
    this.priceLabel = document.querySelector(`.price-label#${element}-price`);
    this.profiteLabel = document.querySelector(`.profite-label#${element}-profite`);
    this.buildingIcon = document.querySelector(`.building-icon#${element}`);
    this.progressBar = document.querySelector(`.animated-progress-bar#${element}`);
    this.buildingAmountLabel = document.querySelector(`.building-amount#${element}`);

    this.initialProfite = props.initialProfite;
    this.increaseProfiteRate = props.increaseProfiteRate;

    this.isActive = props.isInitialActive;
    this.icon = props.icon;
    this.price = props.price;
    this.fee = props.fee;
    this.animationTime = props.animationTime;

    if (props.isInitialActive) {
      this.amount += 1;
      this.updatePurchaseIcon();
    }

    this.updatePriceLabel();
    this.updateProfiteLabel();
    this.updateCurrentProgress();
    this.updateBuildingAmountLabel();
  }

  setImprover(active: boolean) {
    this.hasImprover = active;
  }

  setInitialAtive() {
    if (this.isActive) {
      throw new Error("Already active");
    }

    this.updatePurchaseIcon();
  }

  getProgressBar() {
    return this.progressBar;
  }

  getPurchaseIconButton() {
    return this.buildingIcon;
  }

  getPrice() {
    return this.price;
  }

  getButton() {
    return this.button;
  }

  getProfite() {
    if (this.amount > 0) {
      this.initialProfite *= this.increaseProfiteRate;
    }

    return this.initialProfite;
  }

  getAnimationTime() {
    return this.animationTime;
  }

  getSlider() {
    return this.slider;
  }

  getMoney() {
    if (this.isActive) {
      if (this.interval) {
        return;
      }

      this.updateGameMoney();
    }
  }

  addBuild() {
    if (GameStats.money >= this.price) {
      if (this.amount === 0 && !this.isActive) {
        this.updatePurchaseIcon();
      }

      this.amount += 1;

      if (this.amount > 1) {
        this.animationTime *= 0.95;
      }

      GameStats.updateMoney(-this.price);
      this.price *= this.fee;

      if (GameStats.money < this.price) {
        setElementActive(this.button, false);
      }

      this.updateCurrentProgress();
      this.updateBuildingAmountLabel();
      this.updateProfiteLabel();
      this.updatePriceLabel();
    } else {
      console.log("not enough money");

      setElementActive(this.button, false);
    }
  }

  private updateCurrentProgress() {
    const progress = this.baseProgress.findIndex((progress, index) => {
      if (index === 0) {
        return this.amount <= progress;
      }
      return this.amount <= progress && this.amount >= this.baseProgress[index - 1];
    });

    const previousProgress = this.baseProgress[progress - 1];
    const currentProgress = this.baseProgress[progress];
    const currentProgressPercentage =
      (previousProgress
        ? (this.amount - previousProgress) / (currentProgress - previousProgress)
        : this.amount / currentProgress) * 100;

    AddAnimation.editProgressWidth(this.progressBar, currentProgressPercentage);
  }

  private async updateGameMoney() {
    AddAnimation.animate(this.slider, this.animationTime);
    this.interval = (this.hasImprover ? setInterval : setTimeout)(() => {
      GameStats.updateMoney(this.getProfite());

      setElementActive(this.button, GameStats.money >= this.price);

      this.stopAnimation();
      this.interval = null;
    }, this.animationTime * 1000);
  }

  private updatePriceLabel() {
    this.priceLabel.innerHTML = `$ ${moneyFormater(this.price)}`;
  }

  private updateProfiteLabel() {
    this.profiteLabel.innerHTML = `$ ${moneyFormater(this.getProfite())}`;
  }

  private updateBuildingAmountLabel() {
    this.buildingAmountLabel.innerHTML = `${this.amount}`;
  }

  private updatePurchaseIcon() {
    const image = new Image(50, 50);
    image.src = this.icon;
    this.buildingIcon.style.cursor = "pointer";

    this.buildingIcon.appendChild(image);
    this.isActive = true;
  }

  private stopAnimation() {
    AddAnimation.removeAnimation(this.slider);
  }
}
