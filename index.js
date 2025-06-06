﻿// the bouny.........

let rabbits = [];

var lastTime;
var x = 0;

class Rabbit {
    constructor(element, dx, dy) {
        this.element = element;
        this.dx = dx;
        this.dy = dy;
        this.speed = remap(Math.random(), 0, 1, 0.5, 1.0);
        this.scale = 0;
    }
}

function remap(value, from1, to1, from2, to2) {
    return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
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

            top = (top + (elapsed * 200 * rabbit.dy * rabbit.speed));
            left = (left + (elapsed * 200 * rabbit.dx * rabbit.speed));

            if (top < 0 && rabbit.dy < 0) {
                rabbit.dy = 1;
            }
            if (left < 0 && rabbit.dx < 0) {
                rabbit.dx = 1;

            }
            if (top > window.innerHeight - 32 && rabbit.dy > 0) {
                rabbit.dy = -1;
            }
            if (left > window.innerWidth - 32 && rabbit.dx > 0) {
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

    if (rabbits.length > 0 && document.getElementById("killrabbits") == null) {
        const killRabbitsButton = document.createElement("button");
        const _cont = document.createTextNode("remove bunnies");
        killRabbitsButton.style = "left: 10px";
        killRabbitsButton.id = "killrabbits";
        killRabbitsButton.addEventListener("click", destroyBunnies);

        killRabbitsButton.className = "killRabbits";
        killRabbitsButton.appendChild(_cont);

        document.body.appendChild(killRabbitsButton);
    }

    if (rabbits.length >= 500 && document.getElementById("duplicaterabbits") == null) {
        const dupRabbitsButton = document.createElement("button");
        const _cont = document.createTextNode("2x");
        dupRabbitsButton.id = "duplicaterabbits";
        dupRabbitsButton.style = "left: 140px";
        dupRabbitsButton.addEventListener("click", duplicateRabbits);

        dupRabbitsButton.className = "killRabbits";
        dupRabbitsButton.appendChild(_cont);

        document.body.appendChild(dupRabbitsButton);
    }

    if (document.getElementById("killrabbits") != null) {
        if (rabbits.length > 100) {
            document.getElementById("killrabbits").innerHTML = "ok thats enough";
        }
        if (rabbits.length > 1000) {
            document.getElementById("killrabbits").innerHTML = "end it";
        }
    }
}

function destroyBunnies() {
    var button = document.getElementById("killrabbits");
    if (button != null) {
        button.remove();
    }
    var button2 = document.getElementById("duplicaterabbits");
    if (button2 != null) {
        button2.remove();
    }

    for (let i = 0; i < rabbits.length; i++) {
        rabbits[i].element.remove();
    }

    rabbits = [];
}

function duplicateRabbits() {
    let len = rabbits.length;
    for (let i = 0; i < len; i++) {
        addBunny();
    }
}