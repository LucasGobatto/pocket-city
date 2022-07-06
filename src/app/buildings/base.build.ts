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
  private price: number;
  private amount = 0;
  private fee: number;
  private profite: number;
  private animationTime: number;
  private hasImprover: boolean;
  public animated = false;

  constructor(props: BuildProps) {
    const { element } = props;
    this.slider = document.querySelector(`.slider#${element}-slider`);
    this.button = document.querySelector(`#${element}-button`);
    this.priceLabel = document.querySelector(`.purchase-price#${element}-price`);

    this.price = props.price;
    this.profite = props.profite;
    this.fee = props.fee;
    this.animationTime = props.animationTime;
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
    return this.amount * this.profite;
  }

  getAnimationTime() {
    return this.animationTime;
  }

  getSlider() {
    return this.slider;
  }

  addBuild() {
    if (GameStats.money >= this.price) {
      this.amount += 1;
      GameStats.updateMoney(-this.price, "price");

      this.price *= this.fee;

      if (this.amount > 1) {
        this.animationTime *= 0.9;
        AddAnimation.setAnimatonTime(this.slider, this.animationTime);
      }

      this.updatePriceLabel();
      this.updateGameMoney();
    } else {
      console.log("not enough money");
      this.setActive(false);
    }
  }

  updatePriceLabel() {
    this.priceLabel.innerHTML = `$ ${this.price.toFixed(2)}`;
    return this;
  }

  setActive(active: boolean) {
    if (active) {
      this.button.setAttribute("name", "ative");
    } else {
      this.button.setAttribute("name", "disable");
    }
  }

  private async updateGameMoney() {
    if (this.hasImprover) {
      // todo: fix this -> how to prevent double profite sleeps?
      while (true) {
        GameStats.updateMoney(this.getProfite(), "profite");
        await this.sleep();
      }
    }

    await this.sleep();
    GameStats.updateMoney(this.getProfite(), "profite");
    AddAnimation.removeAnimation(this.slider);
  }

  private async sleep(): Promise<void> {
    return new Promise((res) => {
      setTimeout(() => res(), this.animationTime * 1000);
    });
  }
}
