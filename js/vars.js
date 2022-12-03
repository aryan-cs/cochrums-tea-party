import { writeDate } from "./firebase.js";

// canvas
const SCALE = 1.6;
const VARIABLE_SCALING = false;
export const WIDTH = 1200, HEIGHT = 600;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// site
var title = "cochrum's tea party";
var version = "v 1.1.1";

window.onload = function () { document.title = title; document.getElementById("title").innerHTML = title + "  <span style=\"font-size: 30px;\"> " + version + "<\span>"; }

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

function dayToDate (day) {

  var date = new Date("2022-11-04");
  date.setDate(date.getDate() + day);
  return date;

}

export var allDates = [];
export var allDurations = [];
export var allDescriptions = [];
export var datapoints = [];