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
};
export class Keys {
    keys;
    pressed;
    clicked;
    released;
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
    update() {
        this.clicked = {};
        this.released = {};
    }
    isActionActive(action, state) {
        return this.keys[action]?.some(key => state[key]) ?? false;
    }
    press(action) {
        return this.isActionActive(action, this.pressed);
    }
    click(action) {
        return this.isActionActive(action, this.clicked);
    }
    release(action) {
        return this.isActionActive(action, this.released);
    }
}
//# sourceMappingURL=Keys.js.map