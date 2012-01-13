$(document).ready(function () {
    $('#btnPlay').fadeIn('slow', function () { });
});
var BREAKOUT = null;
function play() {
    document.getElementById("scoreboard-container").style.visibility = "visible";
    document.getElementById("director").style.display = "none";
    setTimeout(function () {
        BREAKOUT = new VK.BreakoutGame();
        BREAKOUT.initGame({ debug:true, levelsDiv: 'levels', canvas: 'canvas', gameOptions: GameOptions });
    }, 600);
}