import { db, readDate, getDates, readDescription, readDuration } from "./firebase.js";
import { allDates, allDurations, allDescriptions, datapoints, SLOT_WIDTH, DATABASE_SIZE, world } from "./vars.js";

import {
  
  createCornerButton,
  engine,
  renderer,
  WIDTH,
  HEIGHT,
  bodies

} from "./vars.js";
import { Datapoint } from "./datapoint.js";

const mouseConstraint = Matter.MouseConstraint.create(engine, { element: document.getElementsByTagName("canvas")[0] });

Matter.Events.on(mouseConstraint, "mousedown", () => {

  console.log(mouseConstraint)

  for (var b = 0; b < datapoints.length; b++) {

    if (datapoints[b]) {

      if (datapoints[b].body.position.x - (datapoints[b].size / 2) <= mouseConstraint.constraint.pointA.x &&
          mouseConstraint.constraint.pointA.x <= datapoints[b].body.position.x + (datapoints[b].size / 2) &&
          datapoints[b].body.position.y - (datapoints[b].size) / 2 <= mouseConstraint.constraint.pointA.y &&
          mouseConstraint.constraint.pointA.y <= datapoints[b].body.position.y + (datapoints[b].size / 2)) {

        var index = datapoints.indexOf(datapoints[b]);

        document.getElementById("date").innerHTML = datapoints[index].date;
        document.getElementById("duration").innerHTML = datapoints[index].duration + " minutes";
        document.getElementById("description").innerHTML = datapoints[index].description;
        
      }

    }

  }

});

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

    var slot = Matter.Bodies.rectangle((SLOT_WIDTH) * dur, HEIGHT / 2, 2, HEIGHT * 2, { isStatic: true, render: { fillStyle: "#000000" } });

    Matter.Composite.add(engine.world, [slot]);

  }

  Matter.Composite.add(engine.world, [ground]);

}

function load () {

  console.log("loading data from firebase...");

  var days = getDates().then((dates) => {
    
    for (var d = 0; d < dates.length; d++) { datapoints.push(new Datapoint(d + 1)); }

    Matter.World.add(world, mouseConstraint);
  
  });

}

setup();