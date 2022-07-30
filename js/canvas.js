let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {

    canvas = document.getElementById("canvasFun");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    flowField = new FlowFieldFEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0);
    // console.log(canvas);
}

window.addEventListener('resize', function () {
    this.cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldFEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0);
})

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

// CLASSES


class FlowFieldFEffect {
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.strokeStyle = 'white'
        this.#ctx.lineWidth = 1;
        this.#width = width;
        this.#height = height;
        this.lastTime = 0;
        this.interval = 1000 / 60; // 60 fps
        this.timer = 0;
        this.cellSize = 20;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        this.velocityOfRadius = 0.005;
    }
    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.1", "#999");
        this.gradient.addColorStop("0.9", "#444");
    }
    #drawLine(angle, x, y) {
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = (dx * dx) + (dy * dy);
        let lineLength = distance * 0.0001;

        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * lineLength, y + Math.sin(angle) * lineLength);
        this.#ctx.stroke();
    }
    animate(timeStamp) { // delta time to ensure consistency across devices
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        if (this.timer > this.interval) {

            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.velocityOfRadius;

            if (this.radius > 5 || this.radius < -5) this.velocityOfRadius *= -1;

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;
                    this.#drawLine(angle, x, y);
                }
            }


            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}