// Create the canvas
var canvas = document.createElement("canvas");
var gamearea = document.getElementById("gamearea");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
gamearea.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    ctx.drawImage(bgImage, 0, 0);
    bgReady = true;
};
bgImage.src = "grass.png";

// Star image
var starReady = false;
var starImage = new Image();
starImage.onload = function () {
    starReady = true;
};
starImage.src = "mouse.png";


var brokenImage = new Image();
brokenImage.src = "broke.png";

var player = {
    canvas_x: 0,
    canvas_y: 0
};

var star = {
    x: 0,
    y: 100,
    speed: 2500
}

var starsCaught = 0;
collision = document.getElementById("catch");
gamestart = document.getElementById("gamestart");

canvas.addEventListener("mousedown", function (event) {
    player.canvas_x = event.pageX;
    player.canvas_y = event.pageY;
    if (player.canvas_x <= (star.x + 70)
       && player.canvas_x >= (star.x + 10)
       && player.canvas_y <= (star.y + 70)
       && player.canvas_y >= (star.y + 10)) {
        ctx.drawImage(brokenImage, star.x-8, star.y, 56,50);
    }
   
});



var reset = function () {
    player.canvas_y = 0;
    player.canvas_x = 0;
    star.x = 5 + (Math.random() * (canvas.width - 70));
    star.y = 5 + (Math.random() * (canvas.height - 70));
    clearInterval(intervalID);
    intervalID = setInterval(main, star.speed);
}

var update = function () {
    if (player.canvas_x <= (star.x + 70)
        && player.canvas_x >= (star.x + 10)
        && player.canvas_y <= (star.y + 70)
        && player.canvas_y >= (star.y + 10)) {
        ++starsCaught;
        collision.play();
        document.getElementById("starsCaught").innerHTML = "Score: " + starsCaught;

        if (star.speed > 100) {
            star.speed -= 100;
        }
    }
    reset();
}

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (starReady) {
        ctx.drawImage(starImage, star.x, star.y, 40, 40);
    }
}

var main = function () {
    update();
    render();
};

function resetSpeed() {
    player.canvas_x = 0;
    player.canvas_y = 0;
    clearInterval(intervalID);
    intervalID = setInterval(main, 2500)
    star.speed = 2500;
}
function resetScore() {
    starsCaught = 0;
    document.getElementById("starsCaught").innerHTML = "Score: 0";
}

function startGame() {
    starReady = true;
    document.getElementById("btnStartGame").disabled = true;
    intervalID = setInterval(main, 0);
    gamestart.play();
}

var intervalID;

