var stage;
var queue;
var grid;

function init() {
	//var $j = jQuery.noConflict();
	$(window).resize(function(e) {
		// Make canvas full screen
		var canvas = document.getElementById('canvas');
		canvas.height = window.innerHeight - 5;
		canvas.width = window.innerWidth;

	    // Make canvas not blurry
		var context = canvas.getContext('2d');
		context.webkitImageSmoothingEnabled = false;
		context.mozImageSmoothingEnabled = false;
		context.imageSmoothingEnabled = false;
	});
	$(window).resize();

    /** Stage Setup **/
    stage = new createjs.Stage('canvas');
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

	/** Image Progress Bar **/
	var loading = new Loading();
	loading.name = "loading";
	stage.addChild(loading);

	/** Load assets into queue **/
    queue = new createjs.LoadQueue();
    queue.on("fileload", handleFileLoad, this);
    queue.on("complete", handleComplete, this);
	queue.on("progress", handleFileProgress, this);

	$.get('manifest.json?' + Math.random(), function(data) {
        if (typeof data == 'string')
            queue.loadManifest(JSON.parse(data));
	        else
            queue.loadManifest(data);
    });
}

function tick() {
    stage.update();
}

function handleFileLoad(q) {

}

function handleFileProgress(e) {
    var p = e.progress;
    var loading = stage.getChildByName('loading');
	loading.progress(p);
}

function handleComplete(e) {

	stage.removeChild(stage.getChildByName('loading'));

    // keybindings
    Mousetrap.bind('d', function() {

    });

	var img = queue.getItem('rpgTile040');
	var bitmap = new createjs.Bitmap(img.src);

	grid = new Grid(5, 5, 64, 64);
	grid.fill(bitmap.clone());

	stage.addChild(grid);
}
