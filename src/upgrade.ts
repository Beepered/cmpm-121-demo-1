export class Upgrade {
  name: string;
  cost: number;
  clickStrength: number;
  amtBought: number = 0;
  button: HTMLButtonElement;
  text: HTMLParagraphElement;
  constructor(name: string, cost: number, clickStrength: number) {
    this.name = name;
    this.cost = cost;
    this.clickStrength = clickStrength;

    this.button = document.createElement("button");
    this.button.innerHTML = `${name} (${this.cost})`;

    this.text = document.createElement("div");
    this.text.innerHTML = this.amtBought.toString();
  }
}
