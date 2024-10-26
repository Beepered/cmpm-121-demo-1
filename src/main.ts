import "./style.css";
import { Upgrade } from "./upgrade.ts";

let counter: number = 0;
let growthRate: number = 0;
let clickStrength: number = 1;

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
  counter += clickStrength;
});
button.addEventListener("mouseover", () => {
  button.style.transform = "scale(1.15)";
});
button.addEventListener("mouseout", () => {
  button.style.transform = "scale(1)";
});

const counterText = document.createElement("p");
counterText.innerHTML = `${counter} crocodiles`;
counterText.className = "counter-text";
app.append(counterText);

const growthRateText = document.createElement("div");
growthRateText.innerHTML = `${growthRate} auto clicks <br> ${clickStrength} click strength`;
app.append(growthRateText);
growthRateText.style.position = "fixed";
growthRateText.style.textAlign = "right";
growthRateText.style.top = "0";
growthRateText.style.right = "0";
growthRateText.style.padding = "10px";
growthRateText.style.backgroundColor = "#333";
growthRateText.style.color = "white";
growthRateText.style.fontSize = "20px";

const upgradeDescText = document.createElement("p");
upgradeDescText.innerHTML = "hello";
upgradeDescText.className = "upgrade-desc-text";
app.append(upgradeDescText);

const randomText: string[] = [
  "...",
  "The wind is cold",
  "The air is warm",
  "Sweat drips down your forehead",
  "OH! A bird poops on your head",
  "A mosquito bit you but you don't know when",
  "itchy",
  "You see another crocodile hunter and you shoot them.<br>No competition",
  "This is just like Cookie Clicker",
  "The water stinks",
  "hungry",
  "Just how many crocodiles are there?",
  "I wonder how the Titanic is doing?",
  "Did I have to tip that one time?",
  "The light is too bright",
  "Your head hurts from the sun",
  "An owl hoots",
  "Dragonflies buzz by your face and dip into the water",
  "CROCODILE!!!",
  "A weird green chunk float towards you",
  "Is it time to eat yet?",
  "My butt is sweaty",
  "Just a little more...",
  "A frog falls into the water because it is dumb",
];
const MINCHANGETIME = 5,
  MAXCHANGETIME = 20;
let textCanChange = true;
let textChangeTime = Math.floor(Math.random() * MAXCHANGETIME);

interface Item {
  name: string;
  description: string;
  cost: number;
  autoclick: number;
  clickStrength: number;
}

const clickUpgrades: Item[] = [
  {
    name: "cleaning wipes",
    description: "Give your weapons a good clean",
    cost: 10,
    autoclick: 0,
    clickStrength: 0.25,
  },
  {
    name: "new gun",
    description: "Buy a fancy new gun with all that money you have saving",
    cost: 2000,
    autoclick: 0,
    clickStrength: 100,
  },
  {
    name: "crocodile evaporator",
    description:
      "The science team built this. Kill entire cities of crocodiles with this",
    cost: 100000,
    autoclick: 0,
    clickStrength: 1000,
  },
];

const autoUpgrades: Item[] = [
  {
    name: "baby croc hunter",
    description: "Give a baby a knife and hope for the best",
    cost: 10,
    autoclick: 0.1,
    clickStrength: 0,
  },
  {
    name: "homeless rifleman",
    description: "Steal a gun and give a homeless person some money",
    cost: 100,
    autoclick: 2,
    clickStrength: 0,
  },
  {
    name: "fisherman",
    description: "Beg a fisherman to help you kill crocodiles",
    cost: 1000,
    autoclick: 50,
    clickStrength: 0,
  },
  {
    name: "marine biologist",
    description: "Give a marine biologist a living wage",
    cost: 5000,
    autoclick: 100,
    clickStrength: 0,
  },
  {
    name: "crocodile spawner",
    description: "Build a generator to make more crocodiles to kill",
    cost: 50000,
    autoclick: 500,
    clickStrength: 0,
  },
];

const autoUpgradeList: Upgrade[] = [];
const autoUpgradeDiv = document.createElement("div");
app.append(autoUpgradeDiv);
for (const item of autoUpgrades) {
  const upgrade = new Upgrade(
    item.name,
    item.description,
    item.cost,
    item.autoclick,
    item.clickStrength,
  );
  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      growthRate += upgrade.autoclick;
      clickStrength += upgrade.clickStrength;
      counter -= upgrade.cost;
      upgrade.amtBought++;
      upgrade.amtSpent += upgrade.cost;
      upgrade.cost *= 1.15;
      upgrade.button.innerHTML = `${upgrade.name} (${upgrade.cost.toFixed(2)})`;
    }
  });
  upgrade.button.addEventListener("mouseover", () => {
    upgradeDescText.innerHTML = `${upgrade.autoclick} per second and ${upgrade.clickStrength} per click
    <br> ${upgrade.description} <br>
    <span style="font-size: 15px;"> ${upgrade.amtBought} bought | ${upgrade.amtSpent} spent`;
    textCanChange = false;
  });
  upgrade.button.addEventListener("mouseleave", () => {
    upgradeDescText.innerHTML = "...";
    textCanChange = true;
  });
  autoUpgradeDiv.append(upgrade.button);
  autoUpgradeList.push(upgrade);
}

const clickUpgradeList: Upgrade[] = [];
const clickupgradeDiv = document.createElement("div");
app.append(clickupgradeDiv);
for (const item of clickUpgrades) {
  const upgrade = new Upgrade(
    item.name,
    item.description,
    item.cost,
    item.autoclick,
    item.clickStrength,
  );
  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      growthRate += upgrade.autoclick;
      clickStrength += upgrade.clickStrength;
      counter -= upgrade.cost;
      upgrade.amtBought++;
      upgrade.amtSpent += upgrade.cost;
      upgrade.cost *= 1.15;
      upgrade.button.innerHTML = `${upgrade.name} (${upgrade.cost.toFixed(2)})`;
    }
  });
  upgrade.button.addEventListener("mouseover", () => {
    upgradeDescText.innerHTML = `${upgrade.autoclick} per second and ${upgrade.clickStrength} per click
    <br> ${upgrade.description} <br>
    <span style="font-size: 15px;"> ${upgrade.amtBought} bought | ${upgrade.amtSpent} spent`;
    textCanChange = false;
  });
  upgrade.button.addEventListener("mouseleave", () => {
    upgradeDescText.innerHTML = "...";
    textCanChange = true;
  });
  clickupgradeDiv.append(upgrade.button);
  clickUpgradeList.push(upgrade);
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
  growthRateText.innerHTML = `${growthRate.toFixed(1)} auto clicks<br>${clickStrength} click strength`;

  for (const item of autoUpgradeList) {
    if (counter >= item.cost) item.button.disabled = false;
    else item.button.disabled = true;
  }
  for (const item of clickUpgradeList) {
    if (counter >= item.cost) item.button.disabled = false;
    else item.button.disabled = true;
  }

  textChangeTime -= timePassed / 1000;
  if (textChangeTime <= 0 && textCanChange) {
    upgradeDescText.innerHTML =
      randomText[Math.floor(Math.random() * randomText.length)];
    textChangeTime = Math.floor(
      Math.random() * (MAXCHANGETIME - MINCHANGETIME) + MINCHANGETIME,
    );
  }

  requestAnimationFrame(update);
}
requestAnimationFrame(update);
