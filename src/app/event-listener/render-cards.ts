import { Service } from "typedi";
import { GameStats } from "../game-stats";
import { CardProps } from "../models";
import { cardsList, cardSample } from "../tags";
import { moneyFormater } from "../utils";

@Service()
export class RenderCards {
  private currentCards: Node[];

  render(props: CardProps[]) {
    this.currentCards = props.map((prop, index) => this.createCard(prop, index)).filter(Boolean);
    this.currentCards.forEach((card) => cardsList.appendChild(card));
  }

  unrender() {
    const allChildresn = Array.from(cardsList.children);
    allChildresn.forEach((child) => cardsList.removeChild(child));
  }

  private createCard(props: CardProps, cardIndex: number) {
    if (!props.wasBought) {
      const card = cardSample.cloneNode(true);

      (card as any).style.display = "flex";

      const image = card.childNodes[1] as HTMLImageElement;
      image.src = props.icon;

      const titleCard = card.childNodes[3].childNodes[1] as HTMLHRElement;
      titleCard.innerHTML = props.title;
      const descriptionCard = card.childNodes[3].childNodes[3] as HTMLParagraphElement;
      descriptionCard.innerHTML = props.description;
      const priceCard = card.childNodes[3].childNodes[5] as HTMLParagraphElement;
      priceCard.innerHTML = moneyFormater(props.price);
      const purchaseButton = card.childNodes[5] as HTMLButtonElement;

      purchaseButton.addEventListener("click", () => {
        if (GameStats.money >= props.price && props.isActive) {
          props.eventListener();
          this.removeFromStack(cardIndex);
        } else {
          console.log("not enough money");
        }
      });

      if (GameStats.money < props.price || !props.isActive) {
        purchaseButton.setAttribute("name", "disable");
      }

      return card;
    }
  }

  private removeFromStack(cardIndex: number) {
    cardsList.removeChild(this.currentCards[cardIndex]);

    const cardsBefore = this.currentCards.slice(0, cardIndex - 1);
    const cardsAfter = this.currentCards.splice(cardIndex);
    this.currentCards = [...cardsBefore, ...cardsAfter];
  }
}
