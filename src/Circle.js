class Circle {
    constructor(x, y) {
        this.position = {
            x,
            y,
        }
        this.size = 0;
        this.hide = false;
    }

    setSize(size) {
        this.size = size;
    }

    hide() {
        this.hide = true;
    }
}

export default Circle;
