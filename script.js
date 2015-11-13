var stage;
var queue;

function init() {

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

    // create stage
    stage = new createjs.Stage('canvas');

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

	// Add image progress
	var text = new createjs.Text("Loading . . .", "60px Arial", "black");
	text.x = 100;
	text.y = 100;
	text.name = "loading";
	stage.addChild(text);

	var x = text.x;
	var width = 0;
	var y = text.y + text.getBounds().height + 5;
	var height = 2;

	var progressbar = new createjs.Shape();
	progressbar.name = "progress";
	progressbar.graphics.beginFill("red").drawRect(x, y, width, height);
	stage.addChild(progressbar);

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
    var text = stage.getChildByName('loading');

    var x = text.x;
    var width = text.getBounds().width * p;
    var y = text.y + text.getBounds().height + 5;
    var height = 2;

    var progressbar = stage.getChildByName('progress');
    progressbar.graphics.beginFill("red").drawRect(x, y, width, height);
}

function handleComplete(e) {

    stage.removeChild(stage.getChildByName('progress'));
    stage.removeChild(stage.getChildByName('loading'));

    // keybindings
    Mousetrap.bind('d', function() {

    });
}

