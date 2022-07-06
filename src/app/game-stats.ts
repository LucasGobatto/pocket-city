import { moneyDisplay } from "./tags";

export class GameStats {
  static gameTicker = 1000;
  static money = 200;
  static population = 0;

  static updateMoney(amount: number, where: string) {
    console.log(where);
    GameStats.money += amount;
    moneyDisplay.innerHTML = `$ ${GameStats.money.toFixed(2)}`;
  }
}
