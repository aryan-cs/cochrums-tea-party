import {
            
            WIDTH,
            HEIGHT,
            engine,
            allDates,
            allDurations,
            allDescriptions,
            datapoints,
            bodies,
            world
        
} from "./vars.js";

import { readDate, readDuration, readDescription } from "./firebase.js";

import { SLOT_WIDTH } from "./sketch.js";

export class Datapoint {

    constructor (dayNumber) {
        
        this.day = dayNumber;
        this.date = null;
        this.duration = null;
        this.description = null;

        readDate("day " + (dayNumber)).then((_date) => { this.date = _date; this.initialize(); allDates.push(_date); });

        readDuration("day " + (dayNumber)).then((_duration) => { this.duration = _duration; this.initialize(); allDurations.push(_duration); });

        readDescription("day " + (dayNumber)).then((_description) => { this.description = _description; this.initialize(); allDescriptions.push(_description); });

        this.mm = null;
        this.dd = null;
        this.yyyy = null;

        this.dateObject = null;
        this.size = null;
        this.body = null;

        this.initialized = false;

    }

    initialize = () => {

        if (this.date !== null && this.duration !== null && !this.description !== null && !this.initialized && this.date !== undefined) {

            console.log(this.date);
            this.mm = this.date.substring(0, this.date.indexOf("/"));
            this.dd = this.date.substring(this.date.indexOf("/") + 1, this.date.lastIndexOf("/"));
            this.yyyy = this.date.substring(this.date.lastIndexOf("/") + 1);

            this.dateObject = new Date(this.yyyy + "-" + this.mm + "-" + this.dd);
            this.size = SLOT_WIDTH - 2;

            this.body = Matter.Bodies.rectangle((SLOT_WIDTH * this.duration) - (this.size / 2) - 1,
                                             (HEIGHT / 20) - (Math.random() * (150 - 75) + (Math.random() * 75)),
                                              this.size,
                                              this.size,
                                              {

                                                render: {

                                                    fillStyle: "#dbdbdb",
                                                    strokeStyle: "#a8a8a8",
                                                    lineWidth: 2
                                                    
                                                }
                                            
                                            });

            bodies.push(this.body);

            Matter.Composite.add(engine.world, [this.body]);

            this.initialized = true;

        }

    }

}