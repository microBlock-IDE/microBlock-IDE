class Game {
    constructor(element) {
        this.element = element;
        this.canvas = document.createElement("canvas");
        this.element.appendChild(this.canvas);

        this.updateCanvasSize();

        this.ctx = this.canvas.getContext("2d");
        this.ballRadius = 10;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height-30;
        this.dx = 2;
        this.dy = -2;
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width-this.paddleWidth)/2;
        this.rightPressed = false;
        this.leftPressed = false;
        this.brickRowCount = 5;
        this.brickColumnCount = 3;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.score = 0;
        this.lives = 3;
        this.running = false;
        this.extennalControl = 0;

        this.bricks = [];
        for(var c=0; c<this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(var r=0; r<this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);

        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        // document.addEventListener("mousemove", mouseMoveHandler, false);

        this.draw = this.draw.bind(this);
        this.draw();
    }

    keyDownHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = true;
        }
    }
    keyUpHandler(e) {
        if(e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if(e.keyCode == 37) {
            this.leftPressed = false;
        }
    }
    mouseMoveHandler(e) {
        var relativeX = e.clientX - this.canvas.offsetLeft;
        if(relativeX > 0 && relativeX < this.canvas.width) {
            this.paddleX = relativeX - this.paddleWidth / 2;
        }
    }
    gameStart() {
        if (!this.running) {
            this.score = 0;
            this.lives = 3;
            this.x = this.canvas.width/2;
            this.y = this.canvas.height-30;
            this.paddleX = (this.canvas.width-this.paddleWidth)/2;
            this.bricks = [];
            for(var c=0; c<this.brickColumnCount; c++) {
                this.bricks[c] = [];
                for(var r=0; r<this.brickRowCount; r++) {
                    this.bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
            this.running = true;
        }
    }

    updateCanvasSize() {
        this.canvas.width = this.element.clientWidth;
        this.canvas.height = this.element.clientHeight;
    }

    collisionDetection() {
        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                var b = this.bricks[c][r];
                if(b.status == 1) {
                    if(this.x > b.x && this.x < b.x+this.brickWidth && (this.y + this.ballRadius) > b.y && (this.y - this.ballRadius) < b.y+this.brickHeight) {
                        this.dy = -this.dy;
                        b.status = 0;
                        this.score++;
                        if(this.score == this.brickRowCount*this.brickColumnCount) {
                            /* alert("YOU WIN, CONGRATS!");
                            document.location.reload(); */
                            this.running = false;
                        }
                    }
                }
            }
        }
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawBricks() {
        this.brickWidth = (this.canvas.width / this.brickRowCount) - (this.brickPadding * 2);
        this.brickHeight = this.canvas.height * 0.05;
        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                if(this.bricks[c][r].status == 1) {
                    var brickX = (r*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                    var brickY = (c*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "#0095DD";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }
    drawScore() {
        this.ctx.textAlign = "left";
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: "+this.score, 10, 20);
    }
    drawLives() {
        this.ctx.textAlign = "right";
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Lives: "+this.lives, this.canvas.width-10, 20);
    }

    draw() {
        this.updateCanvasSize();

        // Draw bg
        this.ctx.beginPath();
        this.ctx.fillStyle = "#EEEEEE";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();

        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawLives();

        if (!this.running) {
            let dialogWidth = this.canvas.width - 0;
            let dialogHeight = this.canvas.height - 0;
            let dialogX = (this.canvas.width / 2) - (dialogWidth / 2);
            let dialogY = (this.canvas.height / 2) - (dialogHeight / 2);
            // Dialog backgroud
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.ctx.rect(dialogX, dialogY, dialogWidth, dialogHeight);
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.textAlign = "center";
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "#FFFFFF";
            if (this.lives <= 0) {
                this.ctx.fillText("GAME OVER", this.canvas.width / 2, (this.canvas.height / 2) - 30);
            } else if(this.score == this.brickRowCount * this.brickColumnCount) {
                this.ctx.fillText("YOU WIN, CONGRATS!", this.canvas.width / 2, (this.canvas.height / 2) - 30);
            } else {
                this.ctx.fillText("WELCOME", this.canvas.width / 2, (this.canvas.height / 2) - 30);
                this.x = this.canvas.width/2;
                this.y = this.canvas.height-30;
                this.paddleX = (this.canvas.width-this.paddleWidth)/2;
            }
            this.ctx.font = "16px Arial";
            this.ctx.fillText("Press arrow left OR arrow right key to start !", this.canvas.width / 2, (this.canvas.height / 2) + 30);
        } else {
            this.collisionDetection();

            if(this.x + this.dx > this.canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
                this.dx = -this.dx;
            }
            if(this.y + this.dy < (this.ballRadius + this.paddleHeight)) {
                this.dy = -this.dy;
            } else if(this.y + this.dy > this.canvas.height-this.ballRadius-this.paddleHeight) {
                if(this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                    this.dy = -this.dy;
                }
                else {
                    this.lives = this.lives > 0 ? this.lives - 1 : 0;
                    if(!this.lives) {
                        /* alert("GAME OVER");
                        document.location.reload(); */
                        this.running = false;
                    }
                    else {
                        this.x = this.canvas.width/2;
                        this.y = this.canvas.height-30;
                        this.dx = 3;
                        this.dy = -3;
                        this.paddleX = (this.canvas.width-this.paddleWidth)/2;
                    }
                }
            }
        }

        if((this.rightPressed || this.extennalControl > 0) && this.paddleX < this.canvas.width-this.paddleWidth) {
            this.paddleX += 7;
            this.gameStart();
        } else if((this.leftPressed || this.extennalControl < 0) && this.paddleX > 0) {
            this.paddleX -= 7;
            this.gameStart();
        }

        if (this.running) {
            this.x += this.dx;
            this.y += this.dy;
        }

        requestAnimationFrame(this.draw);
    }
};
