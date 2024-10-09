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
app.append(growthRateText)

//you can still change HTML elements after appended
button.addEventListener("click", function () {
  counter++;
});
/*
class Upgrade {
  name: string;
  cost: number;
  clickStrength: number;
  amtBought: number = 0;
  element: HTMLButtonElement;
  text: HTMLParagraphElement
  constructor(name: string, cost: number, clickStrength: number) {
    this.name = name;
    this.cost = cost;
    this.clickStrength = clickStrength;

    this.element = document.createElement("button");
    this.element.innerHTML = `buy 1 ${name}`;
    this.element.disabled = true;

    this.text = document.createElement("div"); //description text
    this.text.innerHTML = this.cost.toString() + ` (${this.amtBought})`;
    this.element.addEventListener("click", function () {
      if (counter >= cost) {
        growthRate += clickStrength;
        counter -= cost;
      }
    });
  }
  update() {
    this.text.innerHTML = this.cost.toString() + ` (${this.amtBought})`;
    if (counter >= this.cost) { //enable
      this.element.disabled = false;
    } else { //disable
      this.element.disabled = true;
    }
  }
}
*/
class TestUpgrade{
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

    this.text = document.createElement("div"); //description text
    this.text.innerHTML = this.cost.toString() + ` (${this.amtBought})`;
  }
  update() {
    if (counter >= this.cost) { //enable
      this.element.disabled = false;
    } else { //disable
      this.element.disabled = true;
    }
  }
}
const button1 = new TestUpgrade("baby croc hunter", 10, 0.1);
const button2 = new TestUpgrade("adult hunter", 100, 2);
const button3 = new TestUpgrade("professional hunter", 1000, 5);
button1.element.addEventListener("click", function () {
  if (counter >= button1.cost) {
    growthRate += button1.clickStrength;
    counter -= button1.cost;
    button1.amtBought++;
    button1.text.innerHTML = button1.cost.toString() + ` (${button1.amtBought})`;
  }
});
button2.element.addEventListener("click", function () {
  if (counter >= button2.cost) {
    growthRate += button2.clickStrength;
    counter -= button2.cost;
    button2.amtBought++;
    button2.text.innerHTML = button2.cost.toString() + ` (${button2.amtBought})`;
  }
});
button3.element.addEventListener("click", function () {
  if (counter >= button3.cost) {
    growthRate += button3.clickStrength;
    counter -= button3.cost;
    button3.amtBought++;
    button3.text.innerHTML = button3.cost.toString() + ` (${button3.amtBought})`;
  }
});
const buttonList = [button1, button2, button3];
for (const item of buttonList) {
  app.append(item.element);
  app.append(item.text)
}
/*
const button1 = new Upgrade("baby croc hunter", 10, 0.1);
const button2 = new Upgrade("adult hunter", 100, 2);
const button3 = new Upgrade("professional hunter", 1000, 5);
const buttonList = [button1, button2, button3];
for (const item of buttonList) {
  app.append(item.element);
  app.append(item.text)
}*/

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
  growthRateText.innerHTML = `${growthRate} auto clicks`;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
