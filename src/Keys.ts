
type KeyBindings = {
    [action: string]: readonly string[];
};

type KeyState = {
    [key: string]: boolean;
};

const keyBindings = {
    up: ['ArrowUp', 'KeyW'],
    down: ['ArrowDown', 'KeyS'],
    left: ['ArrowLeft', 'KeyA'],
    right: ['ArrowRight', 'KeyD'],
    zoomIn: ['KeyC'],
    zoomOut: ['KeyX'],
    space: ['Space'],
    toggleLock: ['KeyF'],
    interact: ['KeyE'],
    reset: ['KeyR'],
    sprint: ['ShiftLeft'],
    enter: ['Enter'],
    inventory: ['KeyI'],
    dismiss: ['KeyB']
} as const;

type NumberKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type KeyAction = keyof typeof keyBindings | NumberKey;

export class Keys {
    keys: KeyBindings;

    pressed: KeyState;
    clicked: KeyState;
    released: KeyState;

    constructor() {
        this.keys = { ...keyBindings };

        for (let i = 1; i <= 9; i++) {
            this.keys[i] = [`Digit${i}`];
        }

        this.pressed = {};
        this.clicked = {};
        this.released = {};

        document.addEventListener('keydown', e => {
            // if (!this.pressed[e.code]) {
            //     this.clicked[e.code] = true;
            // }

            this.pressed[e.code] = true;
        });

        document.addEventListener('keyup', e => {
            delete this.pressed[e.code];
            this.released[e.code] = true;
            this.clicked[e.code] = true;
        });
    }

    update(): void {
        this.clicked = {};
        this.released = {};
    }

    isActionActive(action: KeyAction, state: KeyState): boolean {
        return this.keys[action]?.some(key => state[key]) ?? false;
    }

    press(action: KeyAction): boolean {
        return this.isActionActive(action, this.pressed);
    }

    click(action: KeyAction): boolean {
        return this.isActionActive(action, this.clicked);
    }

    release(action: KeyAction): boolean {
        return this.isActionActive(action, this.released);
    }
}
