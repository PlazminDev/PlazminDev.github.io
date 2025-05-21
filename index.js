// the bouny.........

let rabbits = [];

var lastTime;
var x = 0;

class Rabbit {
    constructor(element, dx, dy) {
        this.element = element;
        this.dx = dx;
        this.dy = dy;
        this.scale = 0;
    }
}

function onLoad() {
    window.requestAnimationFrame(tick);
}

function tick(now) {
    window.requestAnimationFrame(tick);
    if (!lastTime) { lastTime = now; }
    var elapsed = (now - lastTime) / 1000;

    if (elapsed < 1) {

        for (let i = 0; i < rabbits.length; i++) {

            var rabbit = rabbits[i];
            var element = rabbit.element;

            var top = parseFloat(element.style.top);
            var left = parseFloat(element.style.left);

            top = (top + (elapsed * 200 * rabbit.dy));
            left = (left + (elapsed * 300 * rabbit.dx));

            if (top < 0 && rabbit.dy < 0) {
                rabbit.dy = 1;
            }
            if (left < 0 && rabbit.dx < 0) {
                rabbit.dx = 1;

            }
            if (top > window.innerHeight && rabbit.dy > 0) {
                rabbit.dy = -1;
            }
            if (left > window.innerWidth && rabbit.dx > 0) {
                rabbit.dx = -1;
            }

            rabbit.scale = lerp(rabbit.scale, 1, elapsed * 5.0);
            element.style.transform = "scale(" + -rabbit.dx * rabbit.scale + "," + rabbit.scale + ")";
            element.style.top = top + "px";
            element.style.left = left + "px";
        }
    }

    lastTime = now;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function addBunny() {
    const newBunny = document.createElement("div");
    const content = document.createTextNode("🐇");
    newBunny.style = "transform:scale(1,1); font-size:3em; position:fixed; left:" + Math.random() * window.innerWidth + "px; top:" + Math.random() * window.innerHeight + "px; pointer-events:none;";
    newBunny.id = "bnuy";

    newBunny.appendChild(content);
    document.getElementById("rabbitContainer").appendChild(newBunny);

    rabbits.push(new Rabbit(newBunny, Math.random() > 0.5 ? -1 : 1, Math.random() > 0.5 ? -1 : 1));
    if (rabbits.length == 100) {
        console.log("many a buny");
    }
}