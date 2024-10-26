export class Upgrade {
  name: string;
  description: string;
  cost: number;
  autoclick: number;
  clickStrength: number;
  amtBought: number = 0;
  amtSpent: number = 0;
  button: HTMLButtonElement;
  constructor(
    name: string,
    description: string,
    cost: number,
    autoclick: number,
    clickStrength: number,
  ) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.autoclick = autoclick;
    this.clickStrength = clickStrength;

    this.button = document.createElement("button");
    this.button.innerHTML = `${name} (${this.cost})`;
  }
}
