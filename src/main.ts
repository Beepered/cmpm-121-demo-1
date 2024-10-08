import "./style.css";
let counter: number = 0;

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

//auto clicking
let start = 0, prevTime = 0;
function addCounter(timestamp : number) {
  if (start === undefined) {
    start = timestamp;
  }
  
  const elapsed = timestamp - start;
  let timePassed = elapsed - prevTime;
  prevTime = elapsed;
  counter += timePassed / 1000
  div.innerHTML = `${Math.trunc(counter)} crocodiles`;
  requestAnimationFrame(addCounter);
}

requestAnimationFrame(addCounter);