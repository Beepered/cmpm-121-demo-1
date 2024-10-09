import "./style.css";
let counter: number = 0;
let growthRate: number = 0;

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My game 2 again (2)";
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

//you can still change HTML elements after appended
button.addEventListener("click", function () {
  counter++;
  div.innerHTML = `${counter} crocodiles`;
});
/*
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "buy 1 autoclicker";
upgradeButton.disabled = true;
app.append(upgradeButton);
upgradeButton.addEventListener("click", function () {
  if (counter >= 10) {
    growthRate++;
    counter -= 10;
  }
});
*/
class Upgrade {
  name: string;
  cost: number;
  clickStrength: number;
  element: HTMLButtonElement;
  constructor(name: string, cost: number, clickStrength: number) {
    this.name = name;
    this.cost = cost;
    this.clickStrength = clickStrength;

    this.element = document.createElement("button");
    this.element.innerHTML = `buy 1 ${name}`;
    this.element.disabled = true;
    this.element.addEventListener("click", function () {
      if (counter >= cost) {
        growthRate += clickStrength;
        counter -= cost;
      }
    });
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
const button1 = new Upgrade("baby croc hunter", 10, 0.1);
const button2 = new Upgrade("adult hunter", 100, 2);
const button3 = new Upgrade("professional hunter", 1000, 5);
app.append(button1.element);
app.append(button2.element);
app.append(button3.element);
const buttonList = [button1, button2, button3];
for (const item of buttonList) {
  app.append(item.element);
}

//auto clicking
let start = 0,
  prevTime = 0;
function update(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }
  for (const item of buttonList) {
    item.update();
  }
  const elapsed = timestamp - start;
  const timePassed = elapsed - prevTime;
  prevTime = elapsed;
  counter += (timePassed / 1000) * growthRate;
  div.innerHTML = `${Math.trunc(counter)} crocodiles`;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
