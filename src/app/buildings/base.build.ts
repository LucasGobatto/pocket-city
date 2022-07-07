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
  private hasImprover = false;
  public animated = false;

  private interval: NodeJS.Timeout;

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
    this.stopAnimation();

    if (GameStats.money >= this.price) {
      this.amount += 1;
      if (this.amount > 1) {
        this.animationTime *= 0.95;
      }

      GameStats.updateMoney(-this.price);
      this.price *= this.fee;

      this.updatePriceLabel();
    } else {
      alert("not enough money");
      this.setActive(false);
      this.hasImprover = true;
    }

    this.updateGameMoney();
    AddAnimation.animate(this.slider, this.animationTime);

    if (this.hasImprover) {
      AddAnimation.setAnimationInteractionCount(this.slider, "infinite");
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
    if (this.hasImprover) {
      this.interval = setInterval(() => {
        GameStats.updateMoney(this.getProfite());

        if (GameStats.money >= this.price) {
          this.setActive(true);
        }
      }, this.animationTime * 1000);
    } else {
      await this.sleep();
      GameStats.updateMoney(this.getProfite());

      if (GameStats.money <= this.price) {
        this.setActive(true);
      }
    }
  }

  private stopAnimation() {
    clearInterval(this.interval);
    clearTimeout(this.interval);
    AddAnimation.removeAnimation(this.slider);
  }

  private async sleep(): Promise<void> {
    return new Promise((res) => {
      this.interval = setInterval(() => res(), this.animationTime * 1000);
    });
  }
}
