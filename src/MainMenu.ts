import { background, color, fill, noFill, noStroke, stroke, strokeWeight } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/colors.js";
import { beginShape, bezierVertex, endShape, vertex } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/complexShapes.js";
import { ellipse, line, rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/shapes.js";
import { text, textAlign, textFont, textSize } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/text.js";
import { popMatrix, pushMatrix, scale, translate } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@1.1.3/transformation.js";
import { Game } from "./Game.js";

const mouse = Game.Instance.mouse;

textFont("Cinzel");

// Note to self: add bezier function to PJS library
function bezier(x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number) {
    beginShape();
        vertex(x1, y1);
        bezierVertex(cx1, cy1, cx2, cy2, x2, y2);
    endShape();
}

var options = ["START GAME", "OPTIONS", "ACHIEVEMENTS", "EXTRAS", "QUIT GAME"];
var ink = color(255, 255, 255);
//cool variable that I made to make the decorations GLOW!
var glowMode = false;

//bezier... but better
function trace(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, w?: number) {
    noFill();

    if (glowMode) {
        stroke(255, 255, 255, 45);
        strokeWeight((w || 0.8) * 5);
    } else {
        stroke(ink);
        strokeWeight(w || 0.8);
    }

    bezier(a, b, c, d, e, f, g, h);
}

//even better bezier also helps with making it glowy
var tracedCurl = function(x: number, y: number, s: number, flip: number) {
    pushMatrix();
        translate(x, y);
        scale(s * flip, s);

        noFill();

        if (glowMode) {
            stroke(120, 165, 255, 50);
            strokeWeight(3.5);
        } else {
            stroke(ink);
            strokeWeight(0.8);
        }

        bezier(0, 0, -3, -5, 3, -7, 5, -3);
        bezier(5, -3, 7, 1, 2, 3, 1, 0);
        bezier(1, 0, 1, -2, 4, -2, 3, 0);
        bezier(3, 0, 1, 2, -2, 1, -2, -1);
        bezier(-2, -1, -2, -3, 1, -3, 1, -1);

    popMatrix();
};

var drawBackground = function() {
    background(2, 4, 8);
    noStroke();

    for (var i = 0; i < 9; i++) {
        fill(75, 91, 105, 5);
        ellipse(200, 160, 100 + i * 42, 170 + i * 30);
    }

    for (var i = 0; i < 12; i++) {
        fill(190, 190, 180, 5);
        ellipse(200, 35, 45 + i * 23, 180 + i * 12);
    }

    var beam = function(x: number, w: number, alpha: number) {
        for (var i = 0; i < 5; i++) {
            fill(190, 195, 195, alpha / (i + 1));
            beginShape();
                vertex(x - w / 2 - i * 5, 0);
                vertex(x + w / 2 + i * 5, 0);
                vertex(x + w + i * 8, 300);
                vertex(x - w - i * 8, 300);
            endShape();
        }
    };

    beam(115, 12, 5);
    beam(175, 20, 7);
    beam(220, 18, 7);
    beam(285, 13, 5);

    fill(13, 21, 28, 110);
    beginShape();
    vertex(0, 0);
    vertex(65, 0);
    vertex(76, 45);
    vertex(60, 105);
    vertex(85, 150);
    vertex(48, 200);
    vertex(0, 240);
    endShape();

    fill(9, 16, 23, 150);
    beginShape();
    vertex(400, 0);
    vertex(340, 0);
    vertex(330, 60);
    vertex(350, 120);
    vertex(320, 170);
    vertex(370, 220);
    vertex(400, 250);
    endShape();

    fill(5, 10, 16, 190);
    beginShape();
    vertex(0, 170);
    vertex(30, 150);
    vertex(43, 180);
    vertex(68, 205);
    vertex(90, 235);
    vertex(55, 265);
    vertex(0, 290);
    endShape();

    fill(5, 10, 16, 190);
    beginShape();
    vertex(400, 165);
    vertex(370, 145);
    vertex(355, 180);
    vertex(335, 205);
    vertex(310, 245);
    vertex(355, 270);
    vertex(400, 290);
    endShape();

    for (var i = 0; i < 8; i++) {
        fill(105, 119, 128, 9);
        ellipse(200, 205 + i*12, 330 - i*15, 65);
    }

    fill(8, 14, 21, 100);
    ellipse(65, 280, 100, 130);
    ellipse(335, 280, 110, 140);
    ellipse(200, 340, 300, 110);

    fill(2, 5, 9, 230);
    beginShape();
    vertex(0, 310);
    vertex(30, 285);
    vertex(48, 310);
    vertex(75, 300);
    vertex(105, 335);
    vertex(140, 350);
    vertex(0, 400);
    endShape();

    fill(2, 5, 9, 230);
    beginShape();
    vertex(400, 300);
    vertex(375, 280);
    vertex(350, 310);
    vertex(320, 295);
    vertex(290, 335);
    vertex(265, 350);
    vertex(400, 400);
    endShape();

    fill(1, 3, 6, 210);
    rect(0, 365, 400, 35);

    var particles = [
        [45, 150, 2], [120, 45, 2],
        [280, 35, 2], [355, 180, 2],
        [80, 250, 1], [320, 270, 2],
        [155, 300, 1], [240, 180, 2],
        [30, 330, 2], [375, 340, 1],
        [185, 80, 1], [300, 120, 1],
        [105, 190, 2], [260, 320, 1]
    ];

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        fill(190, 205, 210, 12);
        ellipse(p[0], p[1], 10, 10);

        fill(215, 220, 220, 100);
        ellipse(p[0], p[1], p[2], p[2]);
    }

    fill(0, 0, 0, 55);
    rect(0, 0, 12, 400);
    rect(388, 0, 12, 400);
    rect(0, 0, 400, 7);
};

//top decoration
var drawTopDecoration = function() {
    //i drew it to high  :(   had to translate it
    pushMatrix();
    translate(0, 7);

    trace(72, 73, 91, 67, 105, 78, 126, 75);
    trace(126, 75, 143, 72, 150, 78, 164, 75);
    trace(164, 75, 177, 72, 187, 75, 195, 74);
    trace(328, 73, 309, 67, 295, 78, 274, 75);
    trace(274, 75, 257, 72, 250, 78, 236, 75);
    trace(236, 75, 223, 72, 213, 75, 205, 74);
    trace(181, 74, 183, 66, 190, 65, 196, 72, 1);
    trace(219, 74, 217, 66, 210, 65, 204, 72, 1);
    trace(82, 72, 94, 83, 105, 69, 117, 74);
    trace(117, 74, 128, 82, 138, 69, 150, 75);
    trace(150, 75, 160, 80, 169, 71, 179, 74);
    trace(318, 72, 306, 83, 295, 69, 283, 74);
    trace(283, 74, 272, 82, 262, 69, 250, 75);
    trace(250, 75, 240, 80, 231, 71, 221, 74);
    trace(95, 74, 111, 69, 121, 79, 136, 74, 0.65);
    trace(305, 74, 289, 69, 279, 79, 264, 74, 0.65);
    trace(137, 74, 150, 80, 159, 68, 173, 74, 0.65);
    trace(263, 74, 250, 80, 241, 68, 227, 74, 0.65);
    tracedCurl(73, 73, 0.8, 1);
    tracedCurl(100, 75, 0.6, -1);
    tracedCurl(119, 74, 0.65, 1);
    tracedCurl(145, 74, 0.65, -1);
    tracedCurl(164, 74, 0.6, 1);
    tracedCurl(236, 74, 0.6, -1);
    tracedCurl(255, 74, 0.65, 1);
    tracedCurl(281, 74, 0.65, -1);
    tracedCurl(300, 75, 0.6, 1);
    tracedCurl(327, 73, 0.8, -1);

    noStroke();
    fill(glowMode ? color(140, 180, 255, 76) : ink);
    ellipse(200, 71, glowMode ? 5 : 1.5, glowMode ? 5 : 1.5);
    ellipse(204, 73, glowMode ? 4 : 1, glowMode ? 4 : 1);
    ellipse(196, 73, glowMode ? 4 : 1, glowMode ? 4 : 1);

    popMatrix();
};

//bottom decoration
var drawBottomDecoration = function() {
    trace(70, 120, 90, 118, 110, 125, 133, 120);
    trace(133, 120, 151, 115, 168, 126, 184, 120);
    trace(216, 120, 232, 126, 249, 115, 267, 120);
    trace(267, 120, 290, 125, 310, 118, 330, 120);
    trace(76, 122, 84, 138, 106, 141, 116, 123);
    trace(116, 123, 126, 140, 145, 140, 155, 122);
    trace(324, 122, 316, 138, 294, 141, 284, 123);
    trace(284, 123, 274, 140, 255, 140, 245, 122);
    trace(105, 122, 112, 131, 122, 131, 129, 121);
    trace(129, 121, 136, 130, 145, 130, 152, 122);
    trace(295, 122, 288, 131, 278, 131, 271, 121);
    trace(271, 121, 264, 130, 255, 130, 248, 122);
    trace(146, 121, 155, 132, 165, 115, 180, 122);
    trace(254, 121, 245, 132, 235, 115, 220, 122);
    trace(156, 122, 167, 127, 174, 118, 187, 123);
    trace(244, 122, 233, 127, 226, 118, 213, 123);
    tracedCurl(72, 120, 0.9, 1);
    tracedCurl(91, 126, 0.7, -1);
    tracedCurl(113, 124, 0.7, 1);
    tracedCurl(136, 123, 0.65, -1);
    tracedCurl(160, 123, 0.65, 1);
    tracedCurl(328, 120, 0.9, -1);
    tracedCurl(309, 126, 0.7, 1);
    tracedCurl(287, 124, 0.7, -1);
    tracedCurl(264, 123, 0.65, 1);
    tracedCurl(240, 123, 0.65, -1);
    trace(174, 124, 179, 117, 185, 118, 190, 123);
    trace(226, 124, 221, 117, 215, 118, 210, 123);
    trace(178, 128, 184, 132, 188, 126, 191, 126);
    trace(222, 128, 216, 132, 212, 126, 209, 126);
    trace(190, 136, 191, 144, 196, 150, 200, 154, 1.2);
    trace(210, 136, 209, 144, 204, 150, 200, 154, 1.2);
    trace(194, 139, 195, 146, 199, 150, 200, 154, 0.65);
    trace(206, 139, 205, 146, 201, 150, 200, 154, 0.65);
    trace(187, 132, 185, 142, 194, 150, 200, 155);
    trace(213, 132, 215, 142, 206, 150, 200, 155);
};

//mask looking thing in the middle
var drawMask = function() {
    if (glowMode) {
        stroke(120, 165, 255, 50);
        strokeWeight(5);
    } else {
        stroke(ink);
        strokeWeight(1);
    }

    beginShape();
    vertex(191, 116);
    bezierVertex(188, 117, 188, 123, 190, 132);
    bezierVertex(192, 138, 196, 141, 200, 144);
    bezierVertex(204, 141, 208, 138, 210, 132);
    bezierVertex(212, 123, 212, 117, 209, 116);
    bezierVertex(204, 118, 196, 118, 191, 116);
    endShape();

    line(190, 120, 210, 120);
    bezier(190, 124, 194, 125, 206, 125, 210, 124);
    bezier(190, 129, 194, 130, 206, 130, 210, 129);
    bezier(192, 134, 196, 135, 204, 135, 208, 134);
    trace(193, 118, 194, 120, 196, 120, 197, 118, 0.7);
    trace(207, 118, 206, 120, 204, 120, 203, 118, 0.7);
    tracedCurl(188, 128, 0.65, 1);
    tracedCurl(212, 128, 0.65, -1);
};

var drawTitle = function() {
    //makes it look like its glowing
    glowMode = true;
    drawTopDecoration();
    drawBottomDecoration();
    drawMask();

    //draws decorations
    glowMode = false;
    drawTopDecoration();
    drawBottomDecoration();
    drawMask();
    
    //title
    // Font already loaded through the canvas
    //textFont("Georgia"), 34);
    textAlign("CENTER", "CENTER");
    fill(255, 255, 255);
    textSize(28);
    text("HOLLOW KNIGHT", 200, 105);
};

//main menu
export function MainScreen() {
    drawBackground();

    var selected = -1;

    for (var i = 0; i < options.length; i++) {
        var y = 233 + i * 25;

        if (mouse.x > 100 && mouse.x < 300 &&
            mouse.y > y - 12 && mouse.y < y + 12) {
            selected = i;
        }
    }

    textAlign("CENTER", "CENTER");

    for (var j = 0; j < options.length; j++) {
        var menuY = 233 + j * 25;

        // Font already assigned previously
        // textFont(createFont("Georgia"), 12);
        textSize(15);
        if (j === selected) {
            fill(255, 255, 248);
            text("‹‹", 135, menuY);
            text("››", 265, menuY);
        } else {
            fill(215, 213, 210);
        }

        text(options[j], 200, menuY);
    }

    drawTitle();
};

