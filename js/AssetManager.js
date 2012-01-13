if (typeof (VK) == "undefined") {
    VK = {};
};

VK.AssetManager=function() {

    // Track how many assets are loaded so far so
    // that the UI can display progress.
    this.totalAssets = 0;
    this.currentlyLoaded = 0;
    this.images = null;

    this.isDoneLoading = function () {
        return this.totalAssets == this.currentlyLoaded;
    };
    this.loadSound = function(assetManager, id, soundUrl) {
//      var sound = soundManager.createSound({
//        id: id,
//        url: soundUrl,
//        onload: function() {
//           // assetManager.currentlyLoaded++;
//        },
//      });	
    };
    this.loadImage = function (assetManager, pathToImage, imageName, imageWidth, imageHeight) {
        var img = new Image();
        img.onload = function () {
            assetManager.currentlyLoaded++;
        };
        img.src = pathToImage;
        img.width = imageWidth;
        img.height = imageHeight;

        this.images.push(img);

        // Store the image object by name on the Asset Manager.
        assetManager[imageName] = img;
    };
    this.initSoundAssets = function() {
    };
    /** Reset the asset counts on init. */
    this.initAssets = function () {
        this.currentlyLoaded = 0;
        this.images = new Array();
        
        this.loadSound(this, "bounce", "/html5/bounce.wav");

        // Load a couple of local images.
//        this.loadImage(this, "assets/fish.png", "fish", 128, 128);
//        this.loadImage(this, "assets/mermaid.png", "mermaid", 128, 128);
//        this.loadImage(this, "assets/octopus.png", "octopus", 128, 128);
//        this.loadImage(this, "assets/treasure.png", "treasure", 128, 128);

        this.totalAssets = this.images.length;
    };
    this.initAssets();
};