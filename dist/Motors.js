import { RectCollider } from "./Collision.js";
import { Game } from "./Game.js";
import { Vector2 } from "./Vector2.js";
// I think it's unnecessary to store velocity and position in both target and motor. 
// Velocity is part of motor, while position is part of the entity.
// Also, there a mismatches between simply using an { x, y } object versus using a Vector2, so I made it more consistent
const PhysicsConfig = {
    gravity: 0.3
};
export class Motor {
    target;
    collider;
    collisionMap;
    worldColliders;
    vel;
    constructor(target) {
        this.target = target;
        // Entity defines it's own collider and passes it to the motor for collision resolution
        this.collider = target.collider;
        // Use game singleton to access collisionMap and worldColliders. Maybe there's better architecture later
        this.collisionMap = Game.Instance.collisionMap;
        this.worldColliders = Game.Instance.worldColliders;
        // this.worldColliders = worldColliders;
        this.vel = new Vector2(0, 0);
    }
    stop() {
        this.vel = Vector2.zero;
    }
    update() {
        this.vel.y += PhysicsConfig.gravity;
        this.moveX();
        this.moveY();
    }
    moveX() {
        const dx = this.vel.x;
        if (dx === 0)
            return;
        const proposed = this.collider.getBoundsAt(this.target.pos.x + dx, this.target.pos.y);
        for (const other of this.worldColliders) {
            if (!this.collisionMap.check(proposed, other))
                continue;
            if (!(other instanceof RectCollider))
                continue;
            if (dx > 0) {
                this.target.pos.x = Math.min(this.target.pos.x + dx, other.x - this.collider.width);
            }
            else {
                this.target.pos.x = Math.max(this.target.pos.x + dx, other.x + other.width);
            }
            this.vel.x = 0;
        }
        if (this.vel.x !== 0) {
            this.target.pos.x += dx;
        }
        this.collider.x = this.target.pos.x;
        this.collider.y = this.target.pos.y;
    }
    moveY() {
        const dy = this.vel.y;
        if (dy === 0)
            return;
        const proposed = this.collider.getBoundsAt(this.target.pos.x, this.target.pos.y + dy);
        for (const other of this.worldColliders) {
            if (!this.collisionMap.check(proposed, other))
                continue;
            if (!(other instanceof RectCollider))
                continue;
            if (dy > 0) {
                this.target.pos.y = Math.min(this.target.pos.y + dy, other.y - this.collider.height);
            }
            else {
                this.target.pos.y = Math.max(this.target.pos.y + dy, other.y + other.height);
            }
            this.vel.y = 0;
        }
        if (this.vel.y !== 0) {
            this.target.pos.y += dy;
        }
        this.collider.x = this.target.pos.x;
        this.collider.y = this.target.pos.y;
    }
    accelerate(targetVel, time) {
        this.vel = new Vector2((targetVel.x - this.vel.x) / time, (targetVel.y - this.vel.y) / time);
    }
    applyForce(force) {
        this.vel = Vector2.add(this.vel, force);
    }
    setVelocity(newVel) {
        this.vel.set(newVel.x, newVel.y);
    }
}
//# sourceMappingURL=Motors.js.map