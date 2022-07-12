import { AddAnimation } from "../event-listener/add-animation";
import { GameStats } from "../game-stats";
import { Build, BuildNames, CardProps } from "../models";
import { multiplierButton } from "../tags";
import { setElementActive } from "../utils";
import { moneyFormater } from "../utils/money-formater";

interface BuildProps {
  element: BuildNames;
  price: number;
  initialprofit: number;
  increaseprofitRate: number;
  fee: number;
  animationTime: number;
  icon: string;
  isInitialActive?: boolean;
  maintainerProps: Omit<CardProps, "eventListener">;
}

const baseProgress = [10, 20, 50, 100, 150, 200, 300, 400, 500, 750, 1000];

export abstract class BaseBuild implements Build {
  private readonly slider: HTMLDivElement;
  private readonly button: HTMLButtonElement;
  private readonly priceLabel: HTMLParagraphElement;
  private readonly profitLabel: HTMLDivElement;
  private readonly buildingIcon: HTMLDivElement;
  private readonly progressBar: HTMLDivElement;
  private readonly buildingAmountLabel: HTMLParagraphElement;
  private readonly icon: any;
  private readonly maintainerProps: Omit<CardProps, "eventListener">;

  private currentProgressLevel = baseProgress[0];
  private isActive: boolean;
  private price: number;
  private fee: number;
  private animationTime: number;
  private interval: NodeJS.Timeout;
  private hasImprover = false;
  private ephemeralPrice: number;

  protected readonly increaseprofitRate: number;
  protected initialprofit: number;
  protected amount = 0;

  constructor(props: BuildProps) {
    const { element } = props;
    this.slider = document.querySelector(`.animated-slider#${element}-slider`);
    this.button = document.querySelector(`#${element}-button`);
    this.priceLabel = document.querySelector(`.price-label#${element}-price`);
    this.profitLabel = document.querySelector(`.profit-label#${element}-profit`);
    this.buildingIcon = document.querySelector(`.building-icon#${element}`);
    this.progressBar = document.querySelector(`.animated-progress-bar#${element}`);
    this.buildingAmountLabel = document.querySelector(`.building-amount#${element}`);

    this.increaseprofitRate = props.increaseprofitRate;
    this.maintainerProps = props.maintainerProps;
    this.icon = props.icon;

    this.initialprofit = props.initialprofit;
    this.isActive = props.isInitialActive;
    this.price = props.price;
    this.fee = props.fee;
    this.animationTime = props.animationTime;

    if (props.isInitialActive) {
      this.amount += 1;
      this.updatePurchaseIcon();
    }

    this.updatePriceLabel();
    this.updatePurchaseIcon();
    this.updateprofitLabel();
    this.updateCurrentProgress();
    this.updateBuildingAmountLabel();
  }

  getMaintainerCardProps(): CardProps {
    return { ...this.maintainerProps, isActive: this.amount > 0, eventListener: this.setImprover.bind(this) };
  }

  observerMoneyAndSetActive() {
    this.setEphemeralPrice();

    setElementActive(this.button, GameStats.money >= this.ephemeralPrice);
  }

  setImprover() {
    this.maintainerProps.wasBought = true;

    GameStats.updateMoney(-this.maintainerProps.price);

    this.hasImprover = true;

    if (!this.interval) {
      AddAnimation.setAnimationInteractionCount(this.slider, "infinite");
      this.updateGameMoney();
    }
  }

  setInitialActive() {
    if (this.isActive) {
      throw new Error("Already active");
    }

    this.isActive = true;
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

  getprofit() {
    let amount = this.amount;
    if (this.amount > 1) {
      amount += GameStats.currentMultiplierValue - 1;
    }

    return this.getprofitRecursion(amount);
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

  setMultiplePurchaseValue() {
    this.setEphemeralPrice();
    this.observerMoneyAndSetActive();
    this.updatePriceLabel(this.ephemeralPrice);
  }

  addBuild() {
    this.setEphemeralPrice();

    if (GameStats.money >= this.ephemeralPrice) {
      if (this.amount === 0) {
        this.setInitialActive();
      }

      GameStats.updateMoney(-this.ephemeralPrice);

      this.amount += GameStats.currentMultiplierValue;

      const currentFee = Math.pow(this.fee, GameStats.currentMultiplierValue);
      const currentPrice = this.price * currentFee;
      this.price = currentPrice;

      this.setEphemeralPrice();
      if (GameStats.money < this.ephemeralPrice) {
        setElementActive(this.button, false);
      }

      this.updateCurrentProgress();
      this.updateBuildingAmountLabel();
      this.updateprofitLabel();
      this.updatePriceLabel(this.ephemeralPrice);
      this.observerMoneyAndSetActive();
    } else {
      console.log("not enough money");

      this.observerMoneyAndSetActive();
    }
  }

  private updateCurrentProgress() {
    const progress = baseProgress.findIndex((progress, index) => {
      if (index === 0) {
        return this.amount < progress;
      }
      return this.amount < progress && this.amount >= baseProgress[index - 1];
    });

    const previousProgress = baseProgress[progress - 1];
    const currentProgress = baseProgress[progress];
    const currentProgressPercentage =
      (previousProgress
        ? (this.amount - previousProgress) / (currentProgress - previousProgress)
        : this.amount / currentProgress) * 100;

    if (this.currentProgressLevel !== currentProgress) {
      this.animationTime *= 0.7;
      this.currentProgressLevel = currentProgress;
    }

    AddAnimation.editProgressWidth(this.progressBar, currentProgressPercentage);
  }

  private async updateGameMoney() {
    AddAnimation.animate(this.slider, this.animationTime);
    this.interval = setTimeout(() => {
      GameStats.updateMoney(this.getprofit());

      this.stopAnimation();
      this.observerMoneyAndSetActive();

      if (this.hasImprover) {
        AddAnimation.animate(this.slider, this.animationTime);
        AddAnimation.setAnimationInteractionCount(this.slider, "infinite");
        this.updateGameMoney();
      } else {
        this.interval = null;
      }
    }, this.animationTime * 1000);
  }

  private updatePriceLabel(ephemeralPrice?: number) {
    this.priceLabel.innerHTML = `$ ${moneyFormater(ephemeralPrice ?? this.getPrice())}`;
  }

  private updateprofitLabel() {
    this.profitLabel.innerHTML = `$ ${moneyFormater(this.getprofit())}`;
  }

  private updateBuildingAmountLabel() {
    this.buildingAmountLabel.innerHTML = `${this.amount}`;
  }

  private updatePurchaseIcon() {
    const image = new Image(50, 50);
    image.src = this.icon;
    this.buildingIcon.style.cursor = "pointer";

    this.buildingIcon.appendChild(image);
    this.buildingIcon.setAttribute("id", "active");
  }

  private stopAnimation() {
    AddAnimation.removeAnimation(this.slider);
  }

  private setEphemeralPrice() {
    const amount = GameStats.currentMultiplierValue;

    this.ephemeralPrice = [...new Array(amount)].map(() => this.price).reduce((prev, cct) => (cct += prev * this.fee), 0);
  }

  private getprofitRecursion(amount: number): number {
    if (amount === 0) {
      return this.initialprofit;
    } else {
      return this.increaseprofitRate * this.getprofitRecursion(amount - 1);
    }
  }
}
