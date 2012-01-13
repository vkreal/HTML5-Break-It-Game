if (typeof (VK) == "undefined") {
    VK = {};
};
VK.ServerState = function () {
    VK.Server.prototype.saveHighScore = function (score) { };
    VK.Server.prototype.playCount = function () { };
    VK.Server.prototype.getLevels = function () { };
};
VK.GameState = function () {
    // Empty methods so that the children don't necessarily have
    // to fill them all out.
    VK.GameState.prototype.handleMouseDown = function (mouseEvent) {
    };

    // Updating and rendering.
    VK.GameState.prototype.update = function (deltaTime, entities) {
    };
    VK.GameState.prototype.render = function (drawingContext, entities) {
    };

    // Called when the state is entered or exited for special cleanup
    // and init work.
    VK.GameState.prototype.enter = function () {
    };
    VK.GameState.prototype.exit = function () {
    };
}

/** State for loading game assets. */
VK.Loading = function (stateCollection) {
    this.stateCollection = stateCollection;
    
    // Loading state is hard coded to end after a 2 second delay.
    VK.Loading.prototype.update = function (deltaTime, entities) {
        if (this.stateCollection.game.assetManager.isDoneLoading()) {
            this.stateCollection.transition(this.stateCollection.playing);
        }
    };

    // Just so we can see what's going on, render a red screen.
    VK.Loading.prototype.render = function (drawingContext, entities) {
        drawingContext.fillStyle = "#f00";
        drawingContext.fillRect(0, 0, 320, 240);
        drawingContext.fillStyle = "#fff";
        drawingContext.font = "bold 20px sans-serif";
        drawingContext.fillText("Loading " +
				this.stateCollection.game.assetManager.currentlyLoaded +
				" / " +
				this.stateCollection.game.assetManager.totalAssets,
				10, 100);
    };
}
VK.Loading.prototype = new VK.GameState();

/** State for playing the game. */
VK.Playing = function (stateCollection, game) {
    this.stateCollection = stateCollection;
    VK.Playing.prototype.update = function (deltaTime, entities) {
        var len = entities.length;
        for (var i = 0; i < len; i++) {
            entities[i].update(deltaTime);
        }
    };
    VK.Playing.prototype.render = function (drawingContext, entities) {
        game._play(drawingContext, entities);
    };
}
VK.Playing.prototype = new VK.GameState();

/** A collection of all possible states. */
VK.GameStateCollection=function(game) {
    this.game = game;

    // Instances of each possible state.
    this.loading = new VK.Loading(this);
    this.playing = new VK.Playing(this, game);

    // The active state.
    this.current = this.loading;

    VK.GameStateCollection.prototype.transition = function (newCurrentState) {
        this.current.exit();
        this.current = newCurrentState;
        this.current.enter();
    };
}