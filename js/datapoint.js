import { WIDTH, HEIGHT } from "./vars.js";

export class Datapoint {

    constructor (date, duration, description) {
        
        this.date = date;

        console.log(this.date);

        this.duration = duration;
        this.description = description;

        this.m = this.date.substring(0, this.date.indexOf("/"));
        console.log(this.m);
        this.d = this.date.substring(this.date.indexOf("/"), this.date.lastIndexOf("/"));
        console.log(this.d);
        this.y = this.date.substring(this.date.lastIndexOf("/"));
        console.log(this.y);

        this.dateObject = new Date(this.y + "-" + this.m + "-" + this.d);
        this.size = null;
        this.body = null;

        // this.body = Matter.Bodies.circle(WIDTH / 2, HEIGHT / 2, 100, { isStatic: false });

    }

}