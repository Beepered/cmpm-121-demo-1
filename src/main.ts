import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My game 2 again";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button"); // createElement(the HTML name of element)
button.innerHTML = "🐊";
app.append(button);
