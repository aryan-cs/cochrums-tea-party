import { db, readDate, getDates, readDescription, readDuration, getDurations } from "./firebase.js";
import { allDates, allDurations, allDescriptions, datapoints, world, dateToDay } from "./vars.js";

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
export var SLOT_WIDTH = WIDTH;

Matter.Events.on(mouseConstraint, "mousedown", () => {

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

  createCornerButton("edit");
  document.getElementById("edit").style.display = "none";
  document.getElementById("lightsOut").style.display = "none";

  create();

  Matter.Runner.run(engine);
  Matter.Render.run(renderer);

}

function create () {

  console.log("creating bodies...");

  var longest = -1;
  
  var durations = getDurations().then((durations) => {

    for (var d = 0; d < durations.length; d++) {

      if (durations[d] > longest) { longest = durations[d]; }

    }

    SLOT_WIDTH = WIDTH / longest;

    var ground = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 10, WIDTH, 20, { isStatic: true });

    for (var dur = 0; dur < longest; dur++) {

      var slot = Matter.Bodies.rectangle((SLOT_WIDTH) * dur, HEIGHT / 2, 1, HEIGHT * 2, { isStatic: true, render: { fillStyle: "#00000000" } });

      Matter.Composite.add(engine.world, [slot]);

    }

    Matter.Composite.add(engine.world, [ground]);

  });

  var days = getDates().then((dates) => {

    console.log(dates)
    
    for (var d = 0; d < dates.length; d++) { datapoints.push(new Datapoint(d + 1)); }

    Matter.World.add(world, mouseConstraint);

    console.log(datapoints);
  
  });

  console.log(SLOT_WIDTH);

}

setup();