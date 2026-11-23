import { noFill, stroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/shapes.js";

export type CollisionLayer = string;

export const Layers = {
    default: 'default',
    player: 'player',
    enemy: 'enemy',
    world: 'world',
    trigger: 'trigger',
    projectile: 'projectile'
} as const;

export abstract class Collider {
    layer: CollisionLayer;

    constructor(layer: CollisionLayer = Layers.default) {
        this.layer = layer;
    }

    abstract intersects(other: Collider): boolean;

    // Temporary method just for visualizing collider
    abstract draw(): void;
}

export class RectCollider extends Collider {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        layer: CollisionLayer = Layers.default
    ) {
        super(layer);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    intersects(other: Collider): boolean {
        if (!(other instanceof RectCollider)) {
            return false;
        }

        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    getBoundsAt(x: number, y: number): RectCollider {
        return new RectCollider(
            x,
            y,
            this.width,
            this.height,
            this.layer
        );
    }

    draw(): void {
        noFill();
        stroke(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }
}

export class CollisionMap {
    private rules = new Map<string, boolean>();

    private getKey(a: CollisionLayer, b: CollisionLayer): string {
        return [a, b].sort().join('|');
    }

    set(a: CollisionLayer, b: CollisionLayer, enabled: boolean): void {
        this.rules.set(this.getKey(a, b), enabled);
    }

    canCollide(a: Collider, b: Collider): boolean {
        const key = this.getKey(a.layer, b.layer);

        // Explicit rules always take priority
        if (this.rules.has(key)) {
            return this.rules.get(key)!;
        }

        // The default layer collides with everything unless overridden
        if (a.layer === Layers.default || b.layer === Layers.default) {
            return true;
        }

        // Other layers don't collide unless explicitly enabled
        return false;
    }

    check(a: Collider, b: Collider): boolean {
        return this.canCollide(a, b) && a.intersects(b);
    }
}
