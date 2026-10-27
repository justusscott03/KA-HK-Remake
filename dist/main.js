"use strict";
// Hello everyone! If you're in this file, that means you found the git repo for the project!! 
// This is where all the code will go (not this file specifically, but it will be in the repository)
// As the project develops, changes will be pushed here so that you can view the latest versions.
// And I'll use version tags in the source control so that we can look back at older versions of the game.
// I can't tell you how useful that has been at times when creating my games.
// Also, because you're here, you found my git account, which means you can likely also see all my many incompleted KA games.
// Feel free to look at them. I'm unsure if I'll ever complete them, but I hope to someday.
class Vector2 {
    x;
    y;
    static get zero() {
        return new Vector2(0, 0);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
        return { x, y };
    }
}
class Motors {
    target;
    vel;
    pos;
    constructor(target) {
        this.target = target;
        this.target = target;
        this.vel = {
            x: 0,
            y: 0,
        };
        this.pos = {
            x: target.x,
            y: target.y,
        };
    }
    update() {
        this.target.vel = this.vel;
    }
    accelerate(targetVel, time) {
        this.vel = {
            x: (targetVel.x - this.vel.x) / time,
            y: (targetVel.y - this.vel.y) / time,
        };
    }
    applyForce(vel) {
        this.vel = {
            x: this.vel.x + vel.x,
            y: this.vel.y + vel.y,
        };
    }
    stop = () => this.vel = Vector2.zero;
}
class Player {
    x;
    y;
    vel;
    pos;
    motors;
    constructor(config) {
        this.vel = {
            x: 0, y: 0,
        };
        this.motors = new Motors(this);
        this.pos = new Vector2(0, 0);
        this.x = config.x;
        this.y = config.y;
    }
    display() { }
    move() { }
    attack() { }
    update() {
        this.motors.update();
    }
}
//# sourceMappingURL=main.js.map