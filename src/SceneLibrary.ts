import { Game } from "./Game.js";

type SceneHandler = (g: Game) => void;

export const Scenes: Record<string, SceneHandler> = {
    'test' : (g: Game) => {
        g.player?.run();
    },
}