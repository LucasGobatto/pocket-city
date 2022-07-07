import Container from "typedi";
import { AddAnimation } from "../event-listener/add-animation.event-listener";
import { GameStats } from "../game-stats";
import { Build, BuildNames } from "../models";

interface BuildProps {
  element: BuildNames;
  price: number;
  profite: number;
  fee: number;
  animationTime: number;
}

export abstract class BaseBuild implements Build {
  private readonly slider: HTMLDivElement;
  private readonly button: HTMLButtonElement;
  private readonly priceLabel: HTMLParagraphElement;
  private readonly profiteLabel: HTMLDivElement;
  private readonly purchaseIcon: HTMLDivElement;
  private price: number;
  private amount = 0;
  private fee: number;
  private profite: number;
  private animationTime: number;
  private hasImprover = false;
  private interval: NodeJS.Timeout;

  public animated = false;

  constructor(props: BuildProps) {
    const { element } = props;
    this.slider = document.querySelector(`.slider#${element}-slider`);
    this.button = document.querySelector(`#${element}-button`);
    this.priceLabel = document.querySelector(`.purchase-price#${element}-price`);
    this.profiteLabel = document.querySelector(`.profite-label#${element}-profite`);
    this.purchaseIcon = document.querySelector(`.purchase-icon#${element}`);

    this.price = props.price;
    this.profite = props.profite;
    this.fee = props.fee;
    this.animationTime = props.animationTime;

    this.updatePriceLabel();
    this.setProfitLabel();
    this.setActive(this.price <= GameStats.money);
  }

  getPrice() {
    return this.price;
  }

  setAnimation() {
    if (this.animated) {
      throw new Error("Build already in animation");
    }

    this.animated = true;
  }

  setImprover(active: boolean) {
    this.hasImprover = active;
  }

  getButton() {
    return this.button;
  }

  getProfite() {
    return this.price * this.profite;
  }

  setProfitLabel() {
    this.profiteLabel.innerHTML = `$ ${this.getProfite().toFixed(2)}`;
  }

  getAnimationTime() {
    return this.animationTime;
  }

  getSlider() {
    return this.slider;
  }

  setIcon() {
    this.purchaseIcon.innerHTML = this.amount.toString();
  }

  addBuild() {
    if (GameStats.money >= this.price) {
      this.stopAnimation();

      this.amount += 1;
      this.setIcon();

      if (this.amount > 1) {
        this.animationTime *= 0.95;
      }

      GameStats.updateMoney(-this.price);
      this.price *= this.fee;
      AddAnimation.animate(this.slider, this.animationTime);

      if (GameStats.money < this.price) {
        this.setActive(false);
      }

      this.setProfitLabel();
      this.updatePriceLabel();
      this.updateGameMoney();
    } else {
      console.log("not enough money");
      this.setActive(false);

      if (this.hasImprover) {
        AddAnimation.setAnimationInteractionCount(this.slider, "infinite");
        this.updateGameMoney();
      }
    }
  }

  updatePriceLabel() {
    this.priceLabel.innerHTML = `$ ${this.price.toFixed(2)}`;
    return this;
  }

  setActive(active: boolean) {
    if (active) {
      this.button.setAttribute("name", "active");
    } else {
      this.button.setAttribute("name", "disable");
    }
  }

  private async updateGameMoney() {
    this.interval = (this.hasImprover ? setInterval : setTimeout)(() => {
      GameStats.updateMoney(this.getProfite());

      this.setActive(GameStats.money >= this.price);
    }, this.animationTime * 1000);
  }

  private stopAnimation() {
    clearInterval(this.interval);
    clearTimeout(this.interval);
    AddAnimation.removeAnimation(this.slider);
  }
}
