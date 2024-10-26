import "./style.css";
import { Upgrade } from "./upgrade.ts";

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
button.className = "main-button";
app.append(button);
button.addEventListener("click", function () {
  counter++;
});

const counterText = document.createElement("p");
counterText.innerHTML = `${counter} crocodiles`;
counterText.className = "counter-text";
app.append(counterText);

const growthRateText = document.createElement("div");
growthRateText.innerHTML = `${growthRate} auto clicks`;
app.append(growthRateText);
growthRateText.style.position = "fixed";
growthRateText.style.top = "0";
growthRateText.style.right = "0";
growthRateText.style.padding = "10px";
growthRateText.style.backgroundColor = "#333";
growthRateText.style.color = "white";
growthRateText.style.fontSize = "20px";

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

const upgradeList: Upgrade[] = [];
for (const item of availableItems) {
  const upgrade = new Upgrade(item.name, item.cost, item.rate);
  upgrade.text.className = "upgrade-bought-text";
  upgrade.button.addEventListener("click", function () {
    if (counter >= upgrade.cost) {
      growthRate += upgrade.clickStrength;
      counter -= upgrade.cost;
      upgrade.amtBought++;
      upgrade.cost *= 1.15;
      upgrade.button.innerHTML = `${upgrade.name} (${upgrade.cost})`;
      upgrade.text.innerHTML = upgrade.amtBought.toString();
    }
  });
  app.append(upgrade.button);
  app.append(upgrade.text);
  const descText = document.createElement("p");
  descText.innerHTML = item.description;
  app.append(descText);
  upgradeList.push(upgrade);
}

let start = 0,
  prevTime = 0;
function update(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start; // seconds since program ran
  const timePassed = elapsed - prevTime; // milliseconds between update rerun
  prevTime = elapsed;

  counter += (timePassed / 1000) * growthRate;
  counterText.innerHTML = `${counter.toFixed(1)} crocodiles`;
  growthRateText.innerHTML = `${growthRate.toFixed(1)} auto clicks`;

  for (const item of upgradeList) {
    if (counter >= item.cost) item.button.disabled = false;
    else item.button.disabled = true;
  }

  requestAnimationFrame(update);
}
requestAnimationFrame(update);
