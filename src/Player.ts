import { fill, noStroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/colors.js";
import { Motor } from "./Motors.js";
import { Vector2 } from "./Vector2.js";
import { ellipse, rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/shapes.js";
import { Game } from "./Game.js";
import { constrain } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/math.js";
import { Collider, RectCollider } from "./Collision.js";

type PlayerConfig = {
    x: number,
    y: number
};

// Just a type for now, maybe make a full class later
export type Entity = {
    pos: Vector2,
    collider: RectCollider // Every entity implements it's own collider instance
};

export class Player implements Entity {
    //vel: Vector2 - rather than store velocity on player, just request it from the motor
    motors: Motor;

    collider: RectCollider;

    pos: Vector2;
    w: number;
    h: number;
    speed: number;
    maxJump: number;
    falling: boolean;
    jumpForce: number;

    constructor(config: PlayerConfig) {
        this.pos = new Vector2(config.x, config.y); // Make sure this is before motor

        this.w = 60;
        this.h = 60;
        this.speed = 5;
        this.maxJump = -12;
        this.falling = false;
        this.jumpForce = -15;

        this.collider = new RectCollider(this.pos.x, this.pos.y, this.w, this.h);

        this.motors = new Motor(this);
    }
    display() {
        noStroke();
        fill(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        // Temporary: draw collider
        this.collider.draw();
    }
    move() {
        const keys = Game.Instance.keys;
        const vel = this.motors.vel; // request velocity from motor rather than storing on player

        if (keys.press('right')) {
            this.motors.setVelocity(new Vector2(this.speed, vel.y));
        }
        else if (keys.press('left')) {
            this.motors.setVelocity(new Vector2(-this.speed, vel.y));
        }
        else {
            this.motors.setVelocity(new Vector2(0, vel.y));
        }
        
        // Use click rather than press to avoid repeating jumps
        if (keys.click('up') && !this.falling/* && vel.y < this.maxJump*/) {
            console.log("hello")
            this.motors.setVelocity(new Vector2(0, this.jumpForce));
        }
        vel.y = constrain(vel.y, this.maxJump, Infinity);
    }
    attack() { }
    update() {
        this.move();
        this.motors.update();
    }
    run(){
        this.update();
        this.display();
    }
}