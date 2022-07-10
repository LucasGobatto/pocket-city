import { moneyDisplay } from "./tags";
import { moneyFormater } from "./utils/money-formater";

export class GameStats {
  static gameTicker = 200;
  static money = 10000;
  static population = 0;

  static updateMoney(amount: number) {
    GameStats.money += amount;
    moneyDisplay.innerHTML = `$ ${moneyFormater(GameStats.money)}`;
  }
}
