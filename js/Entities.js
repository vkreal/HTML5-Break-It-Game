if (typeof (VK) == "undefined") {
    VK = {};
};

VK.Entity = function (game) {
    this.update = function (timeDelta) { };
    this.render = function (drawingContext) { };
    this.roundRect = function (ctx, x, y, w, h, radius, fillStyle, strokeStyle, lineWidth) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (lineWidth) {
            ctx.lineWidth = lineWidth;
        }
        if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.stroke();
        }
        //        if (fillStyle && fillStyleEnd) {
        //            try {
        //                var grd = ctx.createLinearGradient(0, y, 0, w);
        //                grd.addColorStop(0, fillStyle); // light blue
        //                grd.addColorStop(1, fillStyleEnd); // dark blue
        //                ctx.fillStyle = grd;
        //            }
        //            catch (e) {
        //                debugger
        //            }
        //        }
        //        else {
        ctx.fillStyle = fillStyle;
        //        }

        ctx.fill();


    }

};
VK.BasicBrick = function (game, config) {
    var threeColors = ['#0066CC', '#0099CC', '#00CCCC', '#99FFFF'];
    this.active = false;
    this.unbreakable = false;
    // break need to hit three times before its dead
    this.life = 1;
    this.hits = 0;
    ////////////////////////////////////////////////
    this.ball = false;
    if (config) { // merge
        for (var key in config) {
            if (key == 'active' && config[key] == true) {
                game.BRICKCOUNT++;
            }
            this[key] = config[key];
        }
    };
    this.setActive = function (active) {
        if (active == false) {
            game.BRICKCOUNT--;
        }
        this.active = active;
    };
    this.isActiveAndBreakable = function () {
        return this.active == true && this.unbreakable == false;
    };
    this.getValue = function () {
        if (this.life == 1) {
            return 100;
        }
        else if (this.hits >= this.hitCount) {
            return 200;
        }
        return 0;
    };
    this.render = function (ctx, x, y, w, h, fillStyle) {
        if (this.unbreakable) {
            this.roundRect(ctx, x, y, w, h, 10, 'silver', "gray", 2);
        }
        else if (this.life > 1) {
            this.roundRect(ctx, x, y, w, h, 10, threeColors[this.hits]);
        }
        else {
            this.roundRect(ctx, x, y, w, h, 10, fillStyle);
            if (this.ball) {
                this.ballx = (x + (w / 2));
                this.bally = y + (h / 2);
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(this.ballx, this.bally, 5, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
        }
    };
    this.setHit = function () {
        if (this.life == 1 || this.hits >= this.life) {
            this.setActive(false);
        }
        if (!this.active && this.ball) {
            // this brick contain a ball and now add ball to 
            // game because brick is bead!
            game.AddBall(this.ballx, this.bally);
        }
        this.hits++;
    };
};
VK.BasicBrick.prototype = new VK.Entity();

VK.SideCannon = function (game) {
    this.active = true;
    this.update = function (timeDelta) {
    };
    this.render = function (ctx) {
    };
};
VK.SideCannon.prototype = new VK.Entity();

VK.BasicPaddle = function (game) {
    this.game = game;
    this.position = "BOTTOM";
    this.paddlecolor = "#4D90FE";
    this.paddlex = this.game.WIDTH / 2
    this.paddleh = 16;
    this.paddlew = 90;
    this.paddleh_offset = 45; // 5
    this.rightDown = false;
    this.leftDown = false;
    this.render = function (ctx) {
        ctx.fillStyle = this.paddlecolor;
        var y = game.HEIGHT - (this.paddleh + this.paddleh_offset);

        if (this.rightDown) {
            this.paddlex += 10;
        }
        else if (this.leftDown) {
            this.paddlex -= 10;
        }
        // constraint left
        if (this.paddlex < 0) {
            this.paddlex = 0;
        } // constraint right
        else if (this.paddlex + this.paddlew > game.WIDTH) {
            this.paddlex = game.WIDTH - this.paddlew;
        }
        //console.debug('x: ' + (this.paddlex + this.paddlew) + ' WIDTH: ' + this.game.WIDTH);
        this.roundRect(ctx, this.paddlex, y, this.paddlew, this.paddleh, 10, this.paddlecolor, "#0008DB", 5);
    };
    VK.BasicPaddle.prototype.onKeyUp = function (evt) {
        if (evt.keyCode == 39) {
            this.rightDown = false;
        }
        else if (evt.keyCode == 37) {
            this.leftDown = false;
        }
    };
    VK.BasicPaddle.prototype.onKeyDown = function (evt) {

        if (evt.keyCode == 39) {
            this.rightDown = true;
        }
        else if (evt.keyCode == 37) {
            this.leftDown = true;
        }
    };
    VK.BasicPaddle.prototype.onMouseMove = function (evt) {

        if (evt.pageX > this.game.CanvasMinX && evt.pageX < this.game.CanvasMaxX) {

            this.paddlex = Math.max(evt.pageX - this.game.CanvasMinX - (this.paddlew / 2), 0);
            this.paddlex = Math.min(this.game.WIDTH - this.paddlew, this.paddlex);
        }
    };
    VK.BasicPaddle.prototype.onMouseClick = function (mouseEvent) {
    };
    var that = this;
    $(document).keydown(function (evt) { that.onKeyDown(evt) });
    $(document).keyup(function (evt) { that.onKeyUp(evt) });
    $(document).mousemove(function (evt) { that.onMouseMove(evt) });
};
VK.BasicPaddle.prototype = new VK.Entity();

VK.Ball = function (game, config) {
    // make private
    config = config || {};
    this.x = config.x || 25;
    this.y = config.y || 250;
    this.vx = 1.5;
    this.vy = -6; // -4
    this.ballr = 10;
    this.color = config.color || "#FFFFFF";
    this.purse = 0;
    this.active = true;
    this.canDie = config.canDie || true;
    this.update = function (timeDelta) {
        var rowheight = game.BRICKHEIGHT + game.PADDING;
        var colwidth = game.BRICKWIDTH + game.PADDING;

        var ball = this;
        if (ball.active == true) {

            var row = Math.floor(ball.y / rowheight);
            var col = Math.floor(ball.x / colwidth);
            // The amount that the object will be accelerated in
            // y each second. gravity for y directions
            var gravity = 1;
            var accelerationThisFrame = (timeDelta / 1000) * gravity;

            // Apply the acceleration to the velocity.
            ball.vy = ball.vy + accelerationThisFrame;
            //console.debug(ball.vy);
            var bricks = game.bricks;
            var paddle = game.paddle;
            //reverse the ball and mark the brick as broken
            // TODO: DO BETTER COLLISION DETECTION
            if (ball.y < game.NROWS * rowheight && row >= 0 && col >= 0 && bricks[row] && bricks[row][col] && bricks[row][col].active == true) {
                ball.vy = -ball.vy;
                var brick = bricks[row][col];
                if (brick.unbreakable != true) {
                    brick.setHit(false);
                    game.updateScore(brick.getValue());
                }
                game.playSound('brick');
            }

            if (ball.x + ball.vx + ball.ballr > game.WIDTH || ball.x + ball.vx - ball.ballr < 0) {
                ball.vx *= -1;
                game.playSound('wall');
                ball.impactActivate();
            }
            if (ball.y + ball.vy - ball.ballr < 0) {
                ball.vy *= -1;
                game.playSound('wall');
                ball.impactActivate();
            }
            else if (ball.y + ball.vy + ball.ballr > game.HEIGHT - (paddle.paddleh + paddle.paddleh_offset)) {
                if (ball.x > paddle.paddlex && ball.x < paddle.paddlex + paddle.paddlew) {
                    //move the ball differently based on where it hit the paddle
                    ball.vx = (20 * ((ball.x - (paddle.paddlex + paddle.paddlew / 2)) / paddle.paddlew));
                    //console.debug(ball.vy);
                    ball.vy *= -1;
                    game.playSound('bounce');
                    ball.impactActivate();
                }
                else if (ball.y + ball.vy + ball.ballr > game.HEIGHT) {
                    // BALL HIT BOTTOM HERE!
                    ball.vy *= -1;
                    ball.impactActivate();
                    game.updateScore(100, true);
                    game.removeBallLife();
                }
            }
            // Apply velocity.
            ball.x += ball.vx;
            ball.y += ball.vy;
        }


        this.trailEmitter.x = this.x;
        this.trailEmitter.y = this.y;
        this.trailEmitter.update(timeDelta);

        this.impactEmitter.update(timeDelta);
    };
    this.impactActivate = function () {
        //this.active = false;
        this.impactEmitter.x = this.x;
        this.impactEmitter.y = this.y;
        this.impactEmitter.activate(200);
    };
    this.render = function (ctx) {
        this.impactEmitter.render(ctx);
        this.trailEmitter.render(ctx);
        var count = 0;
        var spikeHeight = 10;
        // Draw the points on the starburst.
        //        for (var r = 0; r < Math.PI * 2; r += Math.PI / 15) {
        //            ctx.rotate(r);
        //            ctx.lineTo(this.radius + spikeHeight * (count % 2), 0);
        //            ctx.rotate(-r);
        //            count++;
        //        }
        //        ctx.translate(-this.x, -this.y);
        if (this.active) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.ballr, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            //if (this.purse > 4) {
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.ballr - 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            //    this.purse = 0;
            //}
            //this.purse++;
        }
    };
    // Trail emitter. Will a trail behind the object.
    this.trailEmitter = new Emitter(
			0, 0, 		//x, y,
			0, 0, 		//width, height,
			0, 0, 		//vx, vy,
			.2, .2, 	//vxRandom, vyRandom,
			0, 0, 		//ax, ay,
			0, 0, 		//axRandom, ayRandom,
			0, 1, 		//vr, vrRandom,
			false, 		//physical,
			1500, 		//maxAge,
			100, 		//emissionRate,
			2000, 		//fadeOut,
			50, 		//maxParticles,
			51, 255, 102, //startR, startG, startB,
			100, 200, 255, //endR, endG, endB,
			8.0, 3.0, 	 //startS, endS		
            1 // radius
	);
    // The trail emitter is always on.
    this.trailEmitter.activate(null);
    this.impactEmitter = new Emitter(
			0, 0, 		//x, y,
			0, 0, 		//width, height,
			0, 0, 		//vx, vy,
			5, 5, 		//vxRandom, vyRandom,
			0, 0, 		//ax, ay,
			0, 0, 		//axRandom, ayRandom,
			0, 0, 		//vr, vrRandom,
			false, 		//physical,
			200, 		//maxAge,
			20, 		//emissionRate,
			100, 		//fadeOut,
			100, 		//maxParticles,
			255, 255, 0, //startR, startG, startB,
			255, 0, 0, //endR, endG, endB,
			1.5, .1 	 //startS, endS		
	);
};
VK.Ball.prototype = new VK.Entity();