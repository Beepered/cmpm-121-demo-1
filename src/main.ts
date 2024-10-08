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

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "buy 1 autoclicker";
upgradeButton.disabled = true;
app.append(upgradeButton)
upgradeButton.addEventListener("click", function(){
  if(counter >= 10){
    growthRate++;
    counter -= 10;
  }
})

//auto clicking
let start = 0,
  prevTime = 0;
function update(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }
  if(counter >= 10){
    upgradeButton.disabled = false;
  }
  else{
    upgradeButton.disabled = true;
  }
  const elapsed = timestamp - start;
  const timePassed = elapsed - prevTime;
  prevTime = elapsed;
  counter += (timePassed / 1000) * growthRate;
  div.innerHTML = `${Math.trunc(counter)} crocodiles`;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
