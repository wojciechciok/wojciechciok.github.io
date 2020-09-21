let arrows = function(p) {

let arrows;
let bullets;
const cols = 4;
let size;
let speed = 5;
let frequency = 2000;
let score = 0;
let scale = 0.6
let keys;
let acceleration = 0.15;
let startSize = 20;
let draw = false;

p.preload = function() {
    p.noLoop();
}

p.setup = function() {
    p.noLoop();
    let sizeY = $(window).height()*0.9;
    let sizeX = sizeY*3/4;
    p.createCanvas(sizeX, sizeY);
    // p.createCanvas(600, 800);
    p.background(0);
    p.noLoop();
    arrows = [];
    bullets = [];
    size = p.width / cols;
    keys = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];
    let angles = [-p.HALF_PI, 0, p.PI, p.HALF_PI];
    for (let i = 0; i < cols; i++) {
        let w = new Arrow(keys[i], i * size, p.height - (2 * size), size, angles[i], i);
        arrows.push(w);
    }
    p.noStroke();
    p.fill(255);
    let w = p.width/2;
    let h = p.height/2;
    console.log('ok')
    p.triangle(w-startSize, h-startSize, w-startSize, h+startSize, w+startSize, h);
}

p.mousePressed = function() {
    if(p.mouseX > p.width/2 + startSize || p.mouseX < p.width/2 - startSize || p.mouseY > p.height/2 + startSize || p.mouseY < p.height/2 - startSize)
        return;
        
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    startAdding();
    draw = true;
    p.loop();
}

function startAdding() {
    setTimeout(startAdding, frequency);
    let i = p.floor(p.random(4));
    bullets.push(new Bullet(i));
}

p.draw = function() {
    if(!draw)
        return;
    p.background(0);
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].show();
        bullets[i].update();
        if (bullets[i].y > p.height - size) {
            if (!bullets[i].below)
                score--;
            bullets[i].below = true;
        }
        if (bullets[i].y > p.height) {
            bullets.splice(i, 1);
        }
    }
    for (let i = 0; i < cols; i++) {
        arrows[i].show();
    }

    p.fill(255);
    p.noStroke();
    p.textSize(100);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(score, 0, p.height - size, p.width, size);

    if (score < 0) {
        p.noStroke();
        p.fill(255)
        p.textSize(150);
        p.background(0);
        p.text("GAME OVER", 0, 0, p.width, p.height);
        p.noLoop();
    }

}

function harder() {
    speed+=acceleration;
    if(frequency>400){
        frequency-=20;
    }
}

p.keyPressed = function() {
    if (keys.indexOf(p.key) > -1) {
        for (let i = 0; i < cols; i++) {
            for (let j = bullets.length - 1; j >= 0; j--) {
                if (isInside(arrows[i], bullets[j])) {
                    if (p.key === arrows[i].key) {
                        if (!bullets[j].below) {
                            bullets.splice(j, 1);
                            score++;
                            harder();
                        }
                    }
                    else {
                        if (!bullets[j].below) {
                            bullets[j].below = true;
                            score--;
                        }
                    }
                    return;
                } else if (p.key === arrows[i].key && bullets[j].y > arrows[i].y - size && bullets[j].y < arrows[i].y + size) {
                    if (!bullets[j].below) {
                        bullets[j].below = true;
                        score--;
                    }
                }
            }
        }
        score--;
    }
}

class Arrow {
    constructor(key, x, y, size, angle, col) {
        this.key = key;
        this.x = x
        this.y = y;
        this.size = size
        this.angle = angle;
        this.col = col;
    }
    show() {
        drawArrow(this.angle, this.x, this.y, this.size);
    }
}

class Bullet {
    constructor(col) {
        this.col = col;
        this.y = -size;
        this.below = false;
    }
    show() {
        p.noStroke();
        if (!this.below) {
            p.fill(0, 0, 255, 128);
        } else {
            p.fill(255, 0, 0, 128);
        }
        p.rect(this.col * size, this.y, size - 5, size - 5);
    }
    update() {
        this.y += speed;
    }
}

function drawArrow(angle, x, y, size) {
    p.stroke(255);
    p.strokeWeight(5);
    p.push();
    let offset = size / 2;
    p.translate(x + offset, y + offset);
    offset *= scale;
    p.rotate(angle);
    p.line(0, -offset, 0, offset);
    p.line(0, -offset, -offset, 0);
    p.line(0, -offset, offset, 0);
    p.pop();
}

function isInside(arrow, bullet) {
    if (bullet.col !== arrow.col)
        return false;
    if (bullet.y < arrow.y - size * (1-scale)/2)
        return false
    if (bullet.y > arrow.y + size * (1-scale)/2)
        return false;
    return true;
}
}

let arrowsP5 = new p5(arrows, 'arrows');