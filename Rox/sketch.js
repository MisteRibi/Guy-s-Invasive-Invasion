let initials = ['M'];
let colors = ['pink', 'red'];

let leftButton;
let rightButton;
let directionPressed = [false, false]
let shootButton;

function setup() {
    leftButton = new Button(10, windowHeight-110, color(50), "left");
    rightButton = new Button(120, windowHeight-110, color(50), "right");
    shootButton = new Button(windowWidth-110, windowHeight-110, color(50), "shoot")
    mode = MAIN_MENU;
    var cnv = createCanvas(windowWidth, windowHeight);
    var y = (windowHeight - height) / 2;
    var x = (windowWidth - width) / 2;
    cnv.position(x, y);
    startGame();
}

function draw() {
    background(0);
    if(mode === MAIN_MENU) {
        fill(255);
        textSize(34);
        text("Guy's Invasive Invasion", width/2 -170 ,height/2 - 150);
        textSize(18);
        text("Press space bar to shoot and the left and right arrow keys to move.",
            width/2 - 260, height/2);
        text("Each Guy faces needs "+BALLOON_HEALTH+" hits to pop. Pop them all before they get you!",
            width/2 - 270, height/2 + 40);
        text("Press Enter or touch screen the screen to Begin...", width/2 - 200, height/2 + 80);
        text("Jay", width/2-5, height - 10);
        textSize(28);
    }
    if (mode === WIN_GAME || mode === GAME_OVER) {
        fill(255);
        if (mode === WIN_GAME) {    
            text("You're a wonderfull, fantastic and perfect person!", width/2-275, height/2);
        } else if (mode === GAME_OVER) {
            text("Unfortunately, bad Guy got you!", width/2-160, height/2);
        }    
        text("Press 'R'  or touch screen the screen to restart", width/2-270, height/2 + 40);
        text("Total Shots: " + shotsFired + "    Score: " + totalScore, 0,40);
    }
    
    if(mode === GAME) {
       /*  let directionPressed = [false, false];
        let leftButton = createButton('left')
            .position(0, windowHeight-20)
            .mousePressed(() => {leftPressed[0] = true; tryMove()})
            .mouseReleased(() => {leftPressed[0] = false; });
        let rightButton = createButton('right')
            .position(40, windowHeight-20)
            .mousePressed(() => {leftPressed[1] = true; tryMove()})
            .mouseReleased(() => leftPressed[1] = false); */
        leftButton.show();
        rightButton.show();
        shootButton.show();
        ship.show();

        //ship movement
        if(keyIsDown(LEFT_ARROW) || directionPressed[0]) {
            tryMove("left");
        }
        if(keyIsDown(RIGHT_ARROW) || directionPressed[1]) {
            tryMove("right");
        }

        //drops loop
        for (let i = 0; i < drops.length; i++) {
            drops[i].show();
            drops[i].move();
            if(drops[i].y < 0) {
                drops[i].evaporate(drops, i);
                continue;
            }
            for (let j = 0; j < balloons.length; j++) {
                
                if(drops[i].hits(balloons[j])) {
                    balloons[j].inflate();
                    drops[i].evaporate(drops, i);
                    totalScore++;
                    if(balloons[j].health < 1){
                        balloons[j].pop(balloons, j);
                    }
                    break;
                }
            }

        }
        //Ballons loop
        for (let i = 0; i < balloons.length; i++) {
            if(balloons[i].x > (width - balloons[i].r/2) || balloons[i].x < 0){
                balloons[i].shiftDown();
            }
            balloons[i].show();
            balloons[i].move();
            if(balloons[i].hits(ship)) {
                console.log("Balloon hit ship");
                mode = GAME_OVER;
            }
        }
        if(balloons.length === 0) {
            mode = WIN_GAME;
        }
        fill(255);
        text("Total Shots: " + shotsFired + "    Score: " + totalScore, 0,40);
    }
}

function startGame() {
    ship = new Ship();
    for (let i = 0; i < BALLOON_COUNT; i++) {
        balloons[i] = new Balloon(i*80+80, 60, random(colors), random(initials));
    }
    drops =[];
    totalScore = 0;
    shotsFired = 0;
}

function keyPressed(){
    //Space bar pressed
    if(keyCode === 32) {
        if (mode == GAME) {
            shoot();
        }
    }
    if(keyCode === ENTER) {
        if(mode == MAIN_MENU) {
            mode = GAME;
        }
    }
    //'r' key pressed
    if(keyCode === 82) {
        console.log("r pressed")
        if(mode == GAME_OVER || mode == WIN_GAME) {
            startGame();
            mode = GAME;
        }
    }
}

function windowResized() {
    if (mode !== GAME) {
        resizeCanvas(windowWidth, windowHeight);
    } else {
        //mode = MAIN_MENU;
    }
}

// touch started
function touchStarted() {
    if(mode === MAIN_MENU) {
        mode = GAME;
    }
    if(mode == GAME_OVER || mode == WIN_GAME) {
        startGame();
        mode = GAME;
    }
    if (leftButton.contains(mouseX, mouseY)) {
        if (mode == GAME) {
            leftButton.col = color(100);
            directionPressed[0] = true;
            tryMove("left");
        }
    }
    if (rightButton.contains(mouseX, mouseY)) {
        if (mode == GAME) {
            rightButton.col = color(100);
            directionPressed[1] = true;
            tryMove("right");
        }
    }
    if (shootButton.contains(mouseX, mouseY)) {
        if (mode == GAME) {
            shootButton.col = color(100);
            shoot();
        }
        
        
    }
}

// touch end
function touchEnded() {
    leftButton.col = color(50);
    rightButton.col = color(50);
    directionPressed = [false, false]
    shootButton.col = color(50);
}

function tryMove(direction) {
    if (direction === "left") {
        if(ship.x > 0+ship.r*3) {
            ship.move(LEFT);
        }
    } else if (direction === "right") {
        if(ship.x < width-ship.r*3){
            ship.move(RIGHT);
        }
    }
}

function shoot() {
    if(drops.length < BULLET_MAX) {
        var drop = new Drop(ship.x, height);
        shotsFired++;
        drops.push(drop);
    }
}
