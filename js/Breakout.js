(function () {
    //////////////////////////////////// LOAD SOUND ASSETS //////////////////////////////////
    if (typeof (soundManager) != "undefined") {
        soundManager.url = 'soundmanagerv297a-20110801/swf/soundmanager2.swf';
        soundManager.debugMode = false;
        //soundManager.preferFlash = false;
        //soundManager.flashVersion = 9; // optional: shiny features (default = 8)
        //soundManager.useFlashBlock = false; // optionally, enable when you're ready to dive in
        /*
        * read up on HTML5 audio support, if you're feeling adventurous.
        * iPad/iPhone and devices without flash installed will always attempt to use it.
        */
        soundManager.onready(function () {
            soundManager.createSound({ id: 'bounce', url: 'assets/sounds/bounce.mp3' });
            soundManager.createSound({ id: 'wall', url: 'assets/sounds/wall.mp3' });
            soundManager.createSound({ id: 'brick', url: 'assets/sounds/brick.mp3' });
            //bg_angels
            //soundManager.createSound({ id: 'bg_bebeto', url: 'assets/sounds/bg_bebeto.mp3', volume: 40, autoPlay: true, onfinish: function () { soundManager.play('bg_bebeto') } });
            // Ready to use; soundManager.createSound() etc. can now be called.
        });
    }
    //////////////////////////////////// END LOAD SOUND ASSETS //////////////////////////////////

    if (typeof (VK) == "undefined") {
        VK = {};
    };

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */callback, /* DOMElement */element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    VK.BreakoutGame = function () {
        var totalScore = 0;
        var ballCount = 0;
        // All the assets for this game.
        this.assetManager = new VK.AssetManager();

        // The tiles for this game.
        this.board = null;

        // The player.
        this.player = null;

        // Keep track of the game time.
        this.globalTime = 0;
        this.localTime = 0;

        // All entities in the game.
        this.entities = [];

        // This will be initialized in the initGame function.
        this.drawingContext = null;

        // All states for this game. To be created in the initGame function.
        this.states = null;

        /* The main update loop. */
        VK.BreakoutGame.prototype.update = function (deltaTime) {
            //            for (var i = 0; i < this.ball.length; i++) {
            //                this.ball[i].update(deltaTime);
            //            }
            this.states.current.update(deltaTime, this.entities);
        };
        // draw ball amount life available
        VK.BreakoutGame.prototype.drawBallLife = function (ctx) {
            var x = 10; y = this.HEIGHT - 15;
            var color = '#0064cd';
            ctx.fillStyle = color;
            ctx.font = "16px 'Bangers', arial, serif;";
            ctx.fillText("Balls", 5, y - 10);

            ctx.fillStyle = color;
            ctx.font = "16px 'Bangers', arial, serif;";
            ctx.fillText("Score", 55, y - 10);

            ctx.fillStyle = 'green';
            ctx.font = "16px 'Bangers', arial, serif;";
            ctx.fillText(this.currentLevel['score'], 55, y + 5);

            for (var i = 0; i < ballCount; i++) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x + (i * 12), y, 5, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
        };
        // draw pause button
        VK.BreakoutGame.prototype.drawPauseButton = function (ctx) {
            var x = this.WIDTH - 60; y = this.HEIGHT - 25;
            //btnPause
            if (!this.button) {
                this.buttons = [{ id: 'iconPause', x: x, y: y }, { id: 'iconRefresh', x: x + 20, y: y }, { id: 'iconList', x: x + 40, y: y}];
            }
            // TODO: PREF
            ctx.drawImage(document.getElementById('iconPause'), x, y);
            ctx.drawImage(document.getElementById('iconRefresh'), x + 20, y);
            ctx.drawImage(document.getElementById('iconList'), x + 40, y);
        };
        VK.BreakoutGame.prototype.removeBallLife = function () {
            ballCount--;
        };
        VK.BreakoutGame.prototype.saveAsPNG = function () {
            window.open(this.canvas.toDataURL("image/png"), 'Screen Shoot');
        };
        VK.BreakoutGame.prototype.getCursorPosition = function (e) {
            var x;
            var y;
            if (e.pageX != undefined && e.pageY != undefined) {
                return {
                    x: e.pageX,
                    y: e.pageY
                };
            }
            return {
                x: e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft,
                y: e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop
            };
        };
        VK.BreakoutGame.prototype.handleMouseClick = function (mouseEvent) {
            mouseEvent = this.getCursorPosition(mouseEvent);
            for (var i = 0; i < this.buttons.length; i++) {
                var e = this.buttons[i];

                // Compute distance from the click to the object center.
                var distance = Math.sqrt(Math.pow(mouseEvent.x - e.x, 2) + Math.pow(mouseEvent.y - e.y, 2));

                // Check if the click is inside the collision radius.
                if (distance < 5) {
                    e.selected = true;
                }
            }
        };
        VK.BreakoutGame.prototype._play = function (drawingContext, entities) {
            var that = this;
            drawingContext.fillStyle = that.BACKCOLOR;
            that.Clear(drawingContext);
            var len = entities.length;
            for (var i = 0; i < len; i++) {
                entities[i].render(drawingContext);
            }

            that.drawBricks();
        };
        /* The main render loop. */
        VK.BreakoutGame.prototype.render = function (drawingContext) {
            this.states.current.render(drawingContext, this.entities);
        };

        /* Logic for updating the stored time steps each frame. */
        VK.BreakoutGame.prototype.mainLoop = function () {

            // Compute the change in time since last frame.
            var now = Date.now();
            var globalTimeDelta = now - this.globalTime;
            var localTimeDelta = Math.min(50, globalTimeDelta);
            this.localTime += localTimeDelta;
            var backBufferContext2D = this.backBufferContext2D;
            // Call the main loop.
            this.update(localTimeDelta);
            backBufferContext2D.clearRect(0, 0, this.WIDTH, this.HEIGHT);
            this.render(backBufferContext2D);
            this.drawBallLife(backBufferContext2D);
            this.drawPauseButton(backBufferContext2D);
            // put buffer into canvas
            this.drawingContext.drawImage(this.backBuffer, 0, 0);
            this.globalTime = now;
        };
        VK.BreakoutGame.prototype.drawBricks = function (ctx) {
            if (this.bricks.length == 0) {
                return;
            }
            var colorIndex = 0;
            var 
                rowColors = this.ROWCOLORS,
                bricks = this.bricks,
                padding = this.PADDING,
                brickheight = this.BRICKHEIGHT,
                brickwidth = this.BRICKWIDTH,
                ncols = 0,
                ctx = this.backBufferContext2D,
                nrows = bricks.length;

            for (i = 0; i < nrows; i++) {
                var rowColor = null;
                if (!(rowColor = rowColors[colorIndex++])) {
                    rowColor = rowColors[(colorIndex = 0)];
                    colorIndex++;
                }
                ncols = bricks[i].length;
                for (var j = 0; j < ncols; j++) {
                    var b = bricks[i][j];
                    if (b && b.active == true) {
                        b.render(ctx, (j * (brickwidth + padding)) + padding,
                 (i * (brickheight + padding)) + padding,
                 brickwidth, brickheight, rowColor);
                    }
                }
            }
        };
        VK.BreakoutGame.prototype.initBricks = function (level) {
            var bricks = this.bricks;
            for (var i = 0; i < level.length; i++) {
                var len = level[i].length;
                bricks[i] = [];
                for (var j = 0; j < len; j++) {
                    bricks[i][j] = new VK.BasicBrick(this, level[i][j]);
                }
            }
        };
        VK.BreakoutGame.prototype.playSound = function (id) {
            if (this.SOUND && typeof (soundManager) != 'undefined') {
                soundManager.play(id);
            }
        };
        VK.BreakoutGame.prototype.updateScore = function (score, penalty, pass) {
            if (!pass) {
                if (penalty) {
                    this.currentLevel['score'] -= score;
                }
                else {
                    this.currentLevel['score'] += score;
                }
            }
        };
        VK.BreakoutGame.prototype.loadGame = function (levelIndex) {
            this.currentLevel = this.levels ? this.levels[levelIndex] : null;
            this._loadGame(this.currentLevel.level, this.currentLevel['score']);
        };
        VK.BreakoutGame.prototype._loadGame = function (level, score) {
            this.updateScore(score, false, true);
            ballCount = 3;
            this.entities = [];
            this.NROWS = level.length;
            this.NCOLS = level[0].length;
            this.BRICKWIDTH = (this.WIDTH / this.NCOLS) - 2;
            this.pause = false;
            this.initBricks(level);
            this.paddle = new VK.BasicPaddle(this);
            this.AddBall(this.WIDTH / 2, 350);
            //this.AddBall(this.WIDTH / 2, 100);
            this.entities.push(this.paddle);
        };
        VK.BreakoutGame.prototype.resetLevelScore = function () {
            if (this.currentLevel) {
                this.currentLevel['score'] = 0;
            }
        };
        VK.BreakoutGame.prototype.restartLevel = function () {
            if (!this.pause) {
                this.pause = false;
                this.globalTime = Date.now();
                if (this.currentLevel) {
                    this.resetLevelScore();
                    this._loadGame(this.currentLevel, this.currentLevel['score']);
                }
            }
        };
        VK.BreakoutGame.prototype.unpauseUI = function () {

        };
        VK.BreakoutGame.prototype.levelsUI = function () {
            if (this.levelsDiv) {
                var sb = [];
                for (var i = 0; i < this.levels.length; i++) {
                    if (this.levels[i]['locked'] == false || this.config['debug'] == true) {
                        sb.push('<span><img src="assets/images/action-unlock-icon.png" level="' + i + '" unlock=true/></span>');
                    }
                    else {
                        sb.push('<span><img src="assets/images/action-lock-icon.png" level="' + i + '"/></span>');
                    }
                }
                this.levelsDiv.innerHTML = sb.join('');
            }
            this.pause = true;
            this.Clear(this.drawingContext);
            document.getElementById('levels-container').style.display = '';
        };
        VK.BreakoutGame.prototype.pauseToggle = function () {
            this.pause = !this.pause;
            if (this.pause == false) { // reset game time
                this.globalTime = Date.now();
                document.getElementById("unpause").style.display = 'none';
            }
            else {
                document.getElementById("unpause").style.display = '';
            }
        };
        /* Start the main loop */
        VK.BreakoutGame.prototype.initGame = function (config) {
            this.config = config;
            this.gameOptions = config['gameOptions'];
            this.levels = this.gameOptions['levels'];
            this.canvasId = config['canvas'];
            this.levelsDiv = config['levelsDiv'] ? document.getElementById(config['levelsDiv']) : null;
            this.SOUND = true;
            this.bricks = [];
            this.BRICKHEIGHT = 20;
            this.PADDING = 2;
            this.ROWCOLORS = ["#00ff00", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
            this.BRICKCOUNT = 0;
            this.canvas = document.getElementById(this.canvasId);

            this.WIDTH = this.canvas.width;
            this.HEIGHT = this.canvas.height;
            // can be removed, but mouse control only on canvas
            this.CanvasMinX = $("#" + this.canvasId).offset().left;
            this.CanvasMaxX = this.CanvasMinX + this.WIDTH;

            this.pause = false;
            this.backBuffer = document.createElement('canvas');
            this.backBuffer.width = this.WIDTH;
            this.backBuffer.height = this.HEIGHT;
            this.backBufferContext2D = this.backBuffer.getContext('2d');

            this.BACKCOLOR = "#000000";
            // Init the drawing context to be used for this game.
            this.drawingContext = this.canvas.getContext('2d');
            // Create the game states.
            this.states = new VK.GameStateCollection(this);

            // Bind the input functions.
            //window.addEventListener('keydown', this.handleKeyDown, true);
            var that = this;
            //            this.canvas.onclick = function (evt) {
            //                that.handleMouseClick(evt);
            //            };
            //            this.canvas.onmousemove = function (mouseEvent) {
            //                console.log("handling mouse move at " + mouseEvent.x + ", " + mouseEvent.y);
            //            };
            $(document).keydown(function (evt) { that.onKeyDown(evt) });
            $(document).keyup(function (evt) { that.onKeyUp(evt) });
            $(document).mousemove(function (evt) { that.onMouseMove(evt) });

            // levels UI
            // TODO: CREATE WIDGET TO DO THIS
            if (this.levelsDiv) {
                this.levelsUI();
                //TODO: FIXED HARD CODED levels-container
                var levelsContainer = document.getElementById('levels-container');
                levelsContainer.style.display = '';
                $(levelsContainer).click(function (evt) {
                    var level = evt.target.getAttribute('level');
                    if (level != null && evt.target.getAttribute('unlock')) {
                        that.resetLevelScore();
                        levelsContainer.style.display = 'none';
                        that.loadGame(parseInt(level));
                    }
                });
            }

            requestAnimFrame(
			    function loop() {
			        if (!that.pause) {
			            that.mainLoop();
			        }
			        requestAnimFrame(loop);
			    }
		    );
        };
        VK.BreakoutGame.prototype.AddBall = function (x, y, canDie) {
            this.entities.push(new VK.Ball(this, { x: x, y: y, canDie: canDie }));
        };
        VK.BreakoutGame.prototype.Clear = function (ctx) {
            ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
            this.Rect(ctx, 0, 0, this.WIDTH, this.HEIGHT);
        };
        VK.BreakoutGame.prototype.Rect = function (ctx, x, y, w, h) {
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.closePath();
            ctx.fill();
        };
        VK.BreakoutGame.prototype.onKeyUp = function (evt) {
            //this.states.current.onKeyUp(evt);
        };
        VK.BreakoutGame.prototype.onKeyDown = function (evt) {
            //this.states.current.onKeyDown(evt);
        };
        VK.BreakoutGame.prototype.onMouseMove = function (evt) {

        };
        VK.BreakoutGame.prototype.onMouseClick = function (mouseEvent) {
            for (var i = 0; i < this.entities.length; i++) {
                var e = this.entities[i];

                // Compute distance from the click to the object center.
                var distance = Math.sqrt(
                  Math.pow(mouseEvent.x - e.x, 2) + Math.pow(mouseEvent.y - e.y, 2));

                // Check if the click is inside the collision radius.
                if (distance < e.radius) {
                    e.selected = true;
                }
            }
        }
    };
})();