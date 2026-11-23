import { CollisionMap, RectCollider } from "./Collision.js";
import { Keys } from "./Keys.js";
import { Mouse } from "./Mouse.js";
import { Player } from "./Player.js";
import { Scenes } from "./SceneLibrary.js";
export class Game {
    static _instance = null;
    static init(config) {
        if (!this._instance) {
            this._instance = new Game(config);
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("Game not initialized");
        }
        return this._instance;
    }
    config;
    keys = new Keys();
    mouse = new Mouse();
    player = null; // Player can't be init. here due to some errors
    collisionMap;
    // Stores all world colliders. Eventually, each scene will store it's own colliders, so we won't need this
    worldColliders = [];
    sceneName;
    constructor(config) {
        this.config = config;
        this.sceneName = config.sceneName;
        // Setup colilsion map. Nothing for now, but more as we setup more layers.
        this.collisionMap = new CollisionMap();
        this.worldColliders.push(new RectCollider(0, 700, 700, 200));
        // I like the ImageManager idea. Basically, ImageManager will load images from an imageLibrary object, and then
        // have the ability to serve those images to any class. Maybe it should be a singleton as well as WorldManager.
        //this.imageManager = new ImageManager(this);
        //this.worldManager = new WorldManager(this);
        // this.worldManager.resetObjs();
    }
    // This method is required because Player must access Game.Instance after game constructor
    initAfterCreation() {
        this.player = new Player({
            x: 200, y: 400,
        });
    }
    load() {
    }
    run() {
        Scenes[this.sceneName](this);
        this.worldColliders.forEach(col => col.draw());
        this.keys.update();
        // keys.update();
    }
}
//# sourceMappingURL=Game.js.map