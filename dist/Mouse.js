export class Mouse {
    x;
    y;
    clicked;
    released;
    pressed;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.clicked = false;
        this.released = false;
        this.pressed = false;
        document.addEventListener('mousemove', e => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
        document.addEventListener('mousedown', () => {
            if (!this.pressed) {
                this.clicked = true;
            }
            this.pressed = true;
        });
        document.addEventListener('mouseup', () => {
            this.pressed = false;
            this.released = true;
        });
    }
    update() {
        this.clicked = false;
        this.released = false;
    }
}
//# sourceMappingURL=Mouse.js.map