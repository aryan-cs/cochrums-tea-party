// canvas
var canvas;
const SCALE = 1.6;
const VARIABLE_SCALING = false;
export const WIDTH = 1200, HEIGHT = 600;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// site
var title = "cochrum tea party";
var version = "v 1.0.1";

window.onload = function () { document.title = title; document.getElementById("title").innerHTML = title + "  <span style=\"font-size: 30px;\"> " + version + "<\span>"; }

function createInputAndButton (buttonMessage, createMessage) {

  var input = document.createElement("input");
  input.type = "text";
  input.id = "inputField";
  input.className = "field";

  document.getElementById("main").appendChild(input);

  var button = document.createElement("button");
  button.className = "field_button";
  button.id = "inputButton";
  button.textContent = buttonMessage;

  document.getElementById("main").appendChild(button);

  document.getElementById(button.id).addEventListener("click", function () { inputButtonClicked(); });

  if (createMessage) {

    var message = document.createElement("p");
    message.id = "result";
    message.className = "message";
    message.innerHTML = createMessage;

    document.getElementById("main").appendChild(message);

  }

  return [input, button];

}

export function createCornerButton (buttonText) {

  var button = document.createElement("button");
  button.className = "corner_button";
  button.id = "cornerButton";
  button.textContent = buttonText;

  document.getElementById("main").appendChild(button);

  document.getElementById(button.id).addEventListener("click", function () { cornerButtonClicked(); });

  return button;

}

function cornerButtonClicked () {

  writeDate("test", "test", "test");

}

// colors
const BACKGROUND_COLOR = getComputedStyle(document.querySelector(":root")).getPropertyValue("--background-color");
const ACCENT_1 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-1");
const ACCENT_2 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-2");

// matter.js
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
export var engine = Engine.create();
export var renderer = Render.create({

  element: document.getElementById("main"),
  engine: engine,
  options: {

    width: WIDTH,
    height: HEIGHT,
    wireframes: false,
    background: BACKGROUND_COLOR

  }

});