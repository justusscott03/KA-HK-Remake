// Hello everyone! If you're in this file, that means you found the git repo for the project!! 
// This is where all the code will go (not this file specifically, but it will be in the repository)
// As the project develops, changes will be pushed here so that you can view the latest versions.
// And I'll use version tags in the source control so that we can look back at older versions of the game.
// I can't tell you how useful that has been at times when creating my games.
// Also, because you're here, you found my git account, which means you can likely also see all my many incompleted KA games.
// Feel free to look at them. I'm unsure if I'll ever complete them, but I hope to someday.

            
// This is where I'm putting code for now. Eventually I will modularize the code and split it into different files.            

interface Vector {
    x: number,
    y: number,
}
class Vector2 {
    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }
    
    constructor(public x: number, public y: number){
        return { x, y };
    }
}


class Motors {
    vel: Vector;
    pos: Vector;
    constructor(public target: any){
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
    update(){
        this.target.vel = this.vel;
    }
    accelerate(targetVel: Vector2, time: number){
        this.vel = {
            x: (targetVel.x - this.vel.x) / time,
            y: (targetVel.y - this.vel.y) / time,
        };
    }
    applyForce(vel: Vector2){
        this.vel = {
            x: this.vel.x + vel.x,
            y: this.vel.y + vel.y,
        };
    }
    stop = () => this.vel = Vector2.zero;
}


interface PlayerConfig {
    
}

class Player {
    x: number;
    y: number;
    vel: Vector;
    pos: Vector2;
    motors: Motors;

    constructor(config: {
        x: 200,
        y: 200,
        vel: {},
        state: '',
    }){
        this.vel = {
            x: 0, y: 0,
        };
        this.motors = new Motors(this);
        this.pos = new Vector2(0, 0);

        this.x = config.x;
        this.y = config.y;
    }
    
    display(){}
    move(){}
    attack(){}
    update(){
        this.motors.update();
    }
}