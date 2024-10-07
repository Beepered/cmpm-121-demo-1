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
setInterval(addCounter, 1000);

function addCounter() {
  counter++;
  div.innerHTML = `${counter} crocodiles`;
}
