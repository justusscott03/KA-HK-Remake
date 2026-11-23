import { Collider, CollisionMap, RectCollider } from "./Collision.js";
import { Game } from "./Game.js";
import { Entity } from "./Player.js";
import { Vector2 } from "./Vector2.js";

// I think it's unnecessary to store velocity and position in both target and motor. 
// Velocity is part of motor, while position is part of the entity.
// Also, there a mismatches between simply using an { x, y } object versus using a Vector2, so I made it more consistent
const PhysicsConfig = {
    gravity: 0.3
};

export class Motor {
    target: Entity;
    collider: RectCollider;
    collisionMap: CollisionMap;
    worldColliders: Collider[];

    vel: Vector2;

    constructor(
        target: Entity,
        // collider: RectCollider,
        // collisionMap: CollisionMap,
        // worldColliders: Collider[]
    ) {
        this.target = target;
        // Entity defines it's own collider and passes it to the motor for collision resolution
        this.collider = target.collider;

        // Use game singleton to access collisionMap and worldColliders. Maybe there's better architecture later
        this.collisionMap = Game.Instance.collisionMap;
        this.worldColliders = Game.Instance.worldColliders;

        // this.worldColliders = worldColliders;

        this.vel = new Vector2(0, 0);
    }

    stop(): void {
        this.vel = Vector2.zero;
    }

    update(): void {
        this.vel.y += PhysicsConfig.gravity;

        this.moveX();
        this.moveY();
    }

    private moveX(): void {
        const dx = this.vel.x;

        if (dx === 0) return;

        const proposed = this.collider.getBoundsAt(
            this.target.pos.x + dx,
            this.target.pos.y
        );

        for (const other of this.worldColliders) {
            if (!this.collisionMap.check(proposed, other)) continue;
            if (!(other instanceof RectCollider)) continue;

            if (dx > 0) {
                this.target.pos.x = Math.min(
                    this.target.pos.x + dx,
                    other.x - this.collider.width
                );
            } else {
                this.target.pos.x = Math.max(
                    this.target.pos.x + dx,
                    other.x + other.width
                );
            }

            this.vel.x = 0;
        }

        if (this.vel.x !== 0) {
            this.target.pos.x += dx;
        }

        this.collider.x = this.target.pos.x;
        this.collider.y = this.target.pos.y;
    }

    private moveY(): void {
        const dy = this.vel.y;

        if (dy === 0) return;

        const proposed = this.collider.getBoundsAt(
            this.target.pos.x,
            this.target.pos.y + dy
        );

        for (const other of this.worldColliders) {
            if (!this.collisionMap.check(proposed, other)) continue;
            if (!(other instanceof RectCollider)) continue;

            if (dy > 0) {
                this.target.pos.y = Math.min(
                    this.target.pos.y + dy,
                    other.y - this.collider.height
                );
            } else {
                this.target.pos.y = Math.max(
                    this.target.pos.y + dy,
                    other.y + other.height
                );
            }

            this.vel.y = 0;
        }

        if (this.vel.y !== 0) {
            this.target.pos.y += dy;
        }

        this.collider.x = this.target.pos.x;
        this.collider.y = this.target.pos.y;
    }

    accelerate(targetVel: Vector2, time: number): void {
        this.vel = new Vector2(
            (targetVel.x - this.vel.x) / time,
            (targetVel.y - this.vel.y) / time
        );
    }

    applyForce(force: Vector2): void {
        this.vel = Vector2.add(this.vel, force);
    }

    setVelocity(newVel: Vector2): void {
        this.vel.set(newVel.x, newVel.y);
    }
}