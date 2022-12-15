import { getDates, writeDate, writeDuration, writeDescription } from "./firebase.js";
import { Datapoint } from "./datapoint.js";

// canvas
const SCALE = 1.6;
const VARIABLE_SCALING = false;
export const WIDTH = window.innerWidth * 0.6, HEIGHT = window.innerHeight * 0.6;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// site
var title = "cochrum's tea party";
var version = "v 1.8.3";

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

  document.getElementById("edit").style.display = "block";
  document.getElementById("lightsOut").style.display = "block";
  document.getElementById("submit").addEventListener("click", function () { submitForm(); });
  document.getElementById("lightsOut").addEventListener("click", function (event) {

    if (event.target.id == "lightsOut") {
      
      document.getElementById("edit").style.display = "none";
      document.getElementById("lightsOut").style.display = "none";

    }
  
  });

  document.onkeydown = function(evt) {

    evt = evt || window.event;

    if (evt.keyCode == 27) {

      document.getElementById("edit").style.display = "none";
      document.getElementById("lightsOut").style.display = "none";

    }

};

}

function submitForm () {

  console.log("submitting form...");

  var day = document.getElementById("dayNumField").value;
  var date = document.getElementById("dateField").value;
  var duration = parseInt(document.getElementById("durationField").value);
  var description = document.getElementById("descriptionField").value;

  if (date && duration && description) {

    console.log("adding new datapoint...");

    writeDate("day " + day, date);
    writeDuration("day " + day, duration);
    writeDescription("day " + day, description);

    let added = false;
    let longest = -1;

    for (var i = 0; i < datapoints.length; i++) {
      
      if (datapoints[i]) {
        
        if (datapoints[i].day == day) {

          Matter.Composite.remove(engine.world, datapoints[i].body);
      
          datapoints[i] = new Datapoint(day);
          added = true;
    
        }

      }

      if (datapoints[i].duration > longest) { longest = datapoints[i].duration; }

    }

    if (!added) { datapoints.push(new Datapoint(day)); }

  }

  document.getElementById("edit").style.display = "none";
  document.getElementById("lightsOut").style.display = "none";

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
export var world = Composite.create();
export var engine = Engine.create();
export var renderer = Render.create({

  element: document.getElementById("main"),
  engine: engine,
  options: {

    width: WIDTH,
    height: HEIGHT,
    wireframes: false,
    background: "#1a1a1a"

  }

});

function dayToDate (day) {

  var date = new Date("2022-11-03");
  date.setDate(date.getDate() + day);
  return date;

}

export function dateToDay (date) {

  console.log(date);

  let mm = date.substring(0, date.indexOf("/"));
  let dd = date.substring(date.indexOf("/") + 1, date.lastIndexOf("/"));
  let yyyy = date.substring(date.lastIndexOf("/") + 1);

  let dateObject = new Date(yyyy + "-" + mm + "-" + dd);

  return parseInt(Math.floor((dateObject - new Date("2022-11-03")) / (1000 * 60 * 60 * 24)));

}

export var allDates = [];
export var allDurations = [];
export var allDescriptions = [];
export var datapoints = [];
export var bodies = [];