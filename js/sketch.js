import { db, readDate, readDescription, readDuration } from "./firebase.js";
import { allDates, allDurations, allDescriptions, datapoints } from "./vars.js";

import {
  
  createCornerButton,
  engine,
  renderer,
  WIDTH,
  HEIGHT

} from "./vars.js";
import { Datapoint } from "./datapoint.js";

function preload () { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  console.log("setting up...");

  createCornerButton("add");

  create();

  Matter.Runner.run(engine);
  Matter.Render.run(renderer);

}

function create () {

  console.log("creating bodies...");

  load();
  
  var ground = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 10, WIDTH, 20, { isStatic: true });

  for (var dur = 0; dur < 20; dur++) {

    var slot = Matter.Bodies.rectangle((WIDTH / 20) * dur, HEIGHT / 2, 1, HEIGHT, { isStatic: true });

    Matter.Composite.add(engine.world, [slot]);

  }

  Matter.Composite.add(engine.world, [ground]);

}

function load () {

  console.log("loading data from firebase...");

  for (var d = 0; d < 10; d++) {

    datapoints.push(new Datapoint(d + 1));

  }

  console.log(datapoints);

}

setup();