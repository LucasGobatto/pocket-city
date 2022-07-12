import { moneyDisplay, multiplierButton } from "./tags";
import { moneyFormater } from "./utils/money-formater";

export class GameStats {
  static gameTicker = 200;
  static money = 0;
  static multiplierValues = [1, 10, 100];
  static currentMultiplierIndex = 0;
  static currentMultiplierValue = GameStats.multiplierValues[GameStats.currentMultiplierIndex];

  static updateMoney(amount?: number) {
    if (amount) {
      GameStats.money += amount;
    }

    moneyDisplay.innerHTML = `$ ${moneyFormater(GameStats.money)}`;
  }

  static updateMultiplePurchaseValue() {
    if (GameStats.currentMultiplierIndex === 2) {
      GameStats.currentMultiplierIndex = 0;
    } else {
      GameStats.currentMultiplierIndex += 1;
    }

    GameStats.currentMultiplierValue = GameStats.multiplierValues[GameStats.currentMultiplierIndex];

    multiplierButton.innerHTML = `x ${GameStats.currentMultiplierValue}`;
  }
}
