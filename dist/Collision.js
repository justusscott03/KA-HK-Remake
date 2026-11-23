import { noFill, stroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/shapes.js";
export const Layers = {
    default: 'default',
    player: 'player',
    enemy: 'enemy',
    world: 'world',
    trigger: 'trigger',
    projectile: 'projectile'
};
export class Collider {
    layer;
    constructor(layer = Layers.default) {
        this.layer = layer;
    }
}
export class RectCollider extends Collider {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height, layer = Layers.default) {
        super(layer);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    intersects(other) {
        if (!(other instanceof RectCollider)) {
            return false;
        }
        return (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y);
    }
    getBoundsAt(x, y) {
        return new RectCollider(x, y, this.width, this.height, this.layer);
    }
    draw() {
        noFill();
        stroke(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }
}
export class CollisionMap {
    rules = new Map();
    getKey(a, b) {
        return [a, b].sort().join('|');
    }
    set(a, b, enabled) {
        this.rules.set(this.getKey(a, b), enabled);
    }
    canCollide(a, b) {
        const key = this.getKey(a.layer, b.layer);
        // Explicit rules always take priority
        if (this.rules.has(key)) {
            return this.rules.get(key);
        }
        // The default layer collides with everything unless overridden
        if (a.layer === Layers.default || b.layer === Layers.default) {
            return true;
        }
        // Other layers don't collide unless explicitly enabled
        return false;
    }
    check(a, b) {
        return this.canCollide(a, b) && a.intersects(b);
    }
}
//# sourceMappingURL=Collision.js.map