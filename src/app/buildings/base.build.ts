import Container from "typedi";
import { AddAnimation } from "../event-listener/add-animation.event-listener";
import { GameStats } from "../game-stats";
import { Build, BuildNames } from "../models";
import { getPastMoney } from "../utils/get-past-money";

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
  private readonly priceLabel: HTMLParagraphElement;
  private readonly profiteLabel: HTMLDivElement;
  private readonly purchaseIcon: HTMLDivElement;
  private readonly increaseProfiteRate: number;
  private readonly initialProfite: number;
  private readonly icon: any;

  private isActive: boolean;
  private price: number;
  private fee: number;
  private animationTime: number;
  private interval: NodeJS.Timeout;

  private amount = 1;
  private hasImprover = false;

  constructor(props: BuildProps) {
    const { element } = props;
    this.slider = document.querySelector(`.slider#${element}-slider`);
    this.button = document.querySelector(`#${element}-button`);
    this.priceLabel = document.querySelector(`.purchase-price#${element}-price`);
    this.profiteLabel = document.querySelector(`.profite-label#${element}-profite`);
    this.purchaseIcon = document.querySelector(`.purchase-icon#${element}`);

    this.initialProfite = props.initialProfite;
    this.increaseProfiteRate = props.increaseProfiteRate;

    this.isActive = props.isInitialActive;
    this.icon = props.icon;
    this.price = props.price;
    this.fee = props.fee;
    this.animationTime = props.animationTime;

    this.setActive(this.isActive);
    if (props.isInitialActive) {
      this.updatePurchaseIcon();
    }

    this.updatePriceLabel();
    this.updateProfiteLabel();
  }

  setImprover(active: boolean) {
    this.hasImprover = active;
  }

  setInitialAtive() {
    if (this.isActive) {
      throw new Error("Alread ative");
    }

    this.updatePurchaseIcon();
  }

  getPurchaseIconButton() {
    return this.purchaseIcon;
  }

  getPrice() {
    return this.price;
  }

  getButton() {
    return this.button;
  }

  getProfite() {
    return this.amount > 1 ? this.amount * this.initialProfite * this.increaseProfiteRate : this.initialProfite;
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
      if (this.amount === 1 && !this.isActive) {
        this.updatePurchaseIcon();
      }

      this.amount += 1;

      if (this.amount > 1) {
        this.animationTime *= 0.95;
      }

      GameStats.updateMoney(-this.price);
      this.price *= this.fee;

      if (GameStats.money < this.price) {
        this.setActive(false);
      }

      this.updateProfiteLabel();
      this.updatePriceLabel();
    } else {
      console.log("not enough money");

      this.setActive(false);
    }
  }

  setActive(active: boolean) {
    if (active) {
      this.button.setAttribute("name", "active");
    } else {
      this.button.setAttribute("name", "disable");
    }
  }

  private async updateGameMoney() {
    AddAnimation.animate(this.slider, this.animationTime);
    this.interval = (this.hasImprover ? setInterval : setTimeout)(() => {
      GameStats.updateMoney(this.getProfite());

      this.setActive(GameStats.money >= this.price);

      this.stopAnimation();
      this.interval = null;
    }, this.animationTime * 1000);
  }

  private updatePriceLabel() {
    this.priceLabel.innerHTML = `$ ${this.price.toFixed(2)}`;
  }

  private updateProfiteLabel() {
    this.profiteLabel.innerHTML = `$ ${this.getProfite().toFixed(2)}`;
  }

  private updatePurchaseIcon() {
    const image = new Image(50, 50);
    image.src = this.icon;
    this.purchaseIcon.style.cursor = "pointer";

    this.purchaseIcon.appendChild(image);
    this.isActive = true;
  }

  private stopAnimation() {
    AddAnimation.removeAnimation(this.slider);
  }
}
