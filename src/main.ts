import "./style.css";
let counter: number = 0;
let growthRate: number = 0;

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Crocodile Hunting";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button"); // createElement(the HTML name of element)
button.innerHTML = "🐊";
app.append(button);

const div = document.createElement("div");
div.innerHTML = `${counter} crocodiles`;
app.append(div);

const growthRateText = document.createElement("div");
growthRateText.innerHTML = `${growthRate} auto clicks`;
app.append(growthRateText);
growthRateText.style.position = "fixed";
growthRateText.style.top = "0";
growthRateText.style.right = "0";
growthRateText.style.padding = "10px";
growthRateText.style.backgroundColor = "#333";
growthRateText.style.color = "white";
growthRateText.style.fontSize = "2em";

//you can still change HTML elements after appended
button.addEventListener("click", function () {
  counter++;
});

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  {
    name: "baby croc hunter",
    description: "Give a baby a gun and hope for the best",
    cost: 10,
    rate: 0.1,
  },
  {
    name: "homeless rifleman",
    description: "Steal a gun and give a homeless person some money",
    cost: 100,
    rate: 2,
  },
  {
    name: "fisherman",
    description: "Beg a fisherman to help you kill crocodiles",
    cost: 1000,
    rate: 50,
  },
  {
    name: "marine biologist",
    description: "Give a marine biologist a living wage",
    cost: 6000,
    rate: 100,
  },
  {
    name: "crocodile spawner",
    description: "Build a generator to make more crocodiles to kill",
    cost: 100000,
    rate: 500,
  },
];

class Upgrade {
  name: string;
  cost: number;
  clickStrength: number;
  amtBought: number = 0;
  element: HTMLButtonElement;
  text: HTMLParagraphElement;
  constructor(name: string, cost: number, clickStrength: number) {
    this.name = name;
    this.cost = cost;
    this.clickStrength = clickStrength;

    this.element = document.createElement("button");
    this.element.innerHTML = `buy 1 ${name}`;

    this.text = document.createElement("div");
    this.text.innerHTML = this.cost.toString() + ` (${this.amtBought})`;
  }
  update() {
    if (counter >= this.cost) {
      //enable
      this.element.disabled = false;
    } else {
      //disable
      this.element.disabled = true;
    }
  }
}

const upgList: Upgrade[] = [];
for (const item of availableItems) {
  const upgrade = new Upgrade(item.name, item.cost, item.rate);
  upgrade.element.addEventListener("click", function () {
    if (counter >= upgrade.cost) {
      growthRate += upgrade.clickStrength;
      counter -= upgrade.cost;
      upgrade.amtBought++;
      upgrade.cost *= 1.15;
      upgrade.text.innerHTML =
        upgrade.cost.toFixed(1).toString() + ` (${upgrade.amtBought})`;
    }
  });
  app.append(upgrade.element);
  app.append(upgrade.text);
  const descText = document.createElement("div");
  descText.innerHTML = item.description;
  app.append(descText);
  upgList.push(upgrade);
}

//update function
let start = 0,
  prevTime = 0;
function update(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }

  for (const item of upgList) {
    item.update();
  }

  const elapsed = timestamp - start; // seconds since program ran
  const timePassed = elapsed - prevTime; // milliseconds between update rerun
  prevTime = elapsed;
  counter += (timePassed / 1000) * growthRate;

  div.innerHTML = `${counter.toFixed(1)} crocodiles`;
  growthRateText.innerHTML = `${growthRate.toFixed(1)} auto clicks`;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
