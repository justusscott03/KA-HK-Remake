import { Collider, CollisionMap, RectCollider } from "./Collision.js";
import { Keys } from "./Keys.js";
import { Mouse } from "./Mouse.js";
import { Player } from "./Player.js";
import { Scenes } from "./SceneLibrary.js";

type GameConfig = {
    sceneName: string
};

export class Game {
    private static _instance: Game | null = null;

    static init(config: GameConfig): Game {
        if (!this._instance) {
            this._instance = new Game(config);
        }
        return this._instance;
    }

    static get Instance(): Game {
        if (!this._instance) {
            throw new Error("Game not initialized");
        }
        return this._instance;
    }

    config: GameConfig;
    keys: Keys = new Keys();
    mouse: Mouse = new Mouse();
    player: Player | null = null; // Player can't be init. here due to some errors
    collisionMap: CollisionMap;

    // Stores all world colliders. Eventually, each scene will store it's own colliders, so we won't need this
    worldColliders: Collider[] = []; 

    sceneName: string;
    
    constructor(config: GameConfig){
        this.config = config;
        this.sceneName = config.sceneName;

        // Setup colilsion map. Nothing for now, but more as we setup more layers.
        this.collisionMap = new CollisionMap();

        this.worldColliders.push(
            new RectCollider(0, 700, 700, 200)
        );
        
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