import { db, readDate, readDescription, readDuration } from "./firebase.js";

import {
  
  createCornerButton,
  engine,
  renderer,
  WIDTH,
  HEIGHT

} from "./vars.js";
import { Datapoint } from "./datapoint.js";

var allDates = [];
var allDurations = [];
var allDescriptions = [];
export var datapoints = [];

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

  datapoints = datapoints.sort((p1, p2) => (p1.dateObject.getTime() < p2.dateObject.getTime()) ? 1 : (p1.dateObject.getTime() > p2.dateObject.getTime()) ? -1 : 0);
  
  var ground = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 10, WIDTH, 20, { isStatic: true });

  for (var d = 0; d < datapoints.length; d++) {

    console.log(datapoints[d].dateObject);

    datapoints[d].body = Matter.Bodies.rectangle((WIDTH / datapoints[d].getDuration()) * d,
                                                  HEIGHT / 2,
                                                  (0.6 * Math.min(WIDTH, HEIGHT)) / datapoints.length,
                                                  (0.6 * Math.min(WIDTH, HEIGHT)) / datapoints.length, 
                                                  {

                                                    isStatic: false

                                                  });

    Matter.World.add(engine.world, [datapoints[d].body]);

  }

  Matter.Composite.add(engine.world, [ground]);

}

function load () {

  console.log("loading data from firebase...");

  for (var d = 0; d < 5; d++) {

    datapoints.push(new Datapoint(readDate("day " + (d + 1)), readDuration("day " + (d + 1)), readDescription("day " + (d + 1))));

  }

  console.log(datapoints);

}

setup();