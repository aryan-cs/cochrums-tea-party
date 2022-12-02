import {
  
  createCornerButton,
  engine,
  renderer,
  WIDTH,
  HEIGHT

} from "./vars.js";

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

  Matter.Composite.add(engine.world, [ground]);

}

function load () {

  console.log("loading data from firebase...");

}

setup();