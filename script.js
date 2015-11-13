var stage;
var queue;
var arr;
var grid;

var N = 1
  , S = 2
  , E = 4
  , W = 8
  , dirs = ['N', 'E', 'S', 'W']
  , dirsValue = { N: N, E: E, S: S, W: W }
  , DX = { E: 1, W: -1, N: 0, S: 0 }
  , DY = { E: 0, W: 0, N: -1, S: 1 }
  , OPPOSITE = { E: W, W: E, N: S, S: N }

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
	if (grid) {
		var cw = $('#canvas').width();
		var ch = $('#canvas').height();
		var arrw = Math.floor(cw / 64);
		var arrh = Math.floor(ch / 64);

		for (var w = 0; w < arrw; w++) {
			for (var h = 0; h < arrh; h++) {

				var g = grid[h][w];
				var img = '';
				if (g == N + S) img = 'NS';
				if (g == N + E) img = 'NE';
				if (g == N + W) img = 'NW';

				if (g == E + S) img = 'ES';
				if (g == E + W) img = 'EW';
				if (g == S + W) img = 'SW';
				if (g == N + W) img = 'NW';

				if (g == N) img = 'N';
				if (g == E) img = 'E';
				if (g == S) img = 'S';
				if (g == W) img = 'W';

				if (g == N + E + S) img = 'NES';
				if (g == N + S + W) img = 'NSW';
				if (g == N + E + W) img = 'NEW';
				if (g == E + S + W) img = 'ESW';
				if (g == E + S + W) img = 'ESW';

				if (g == N + E + S + W) img = 'NESW';

				var texture = queue.getResult(img);
				var tile = new createjs.Bitmap(texture);
				tile.name = w + ',' + h;
				tile.x = w * 64;
				tile.y = h * 64;
				stage.removeChild(stage.getChildByName(w + ',' + h));
				stage.addChild(tile);
			}
		}
	}
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

	// start stuff

	grid = [];
	var cw = $('#canvas').width();
	var ch = $('#canvas').height();
	var arrw = Math.floor(cw / 64);
	var arrh = Math.floor(ch / 64);

	for (var w = 0; w < arrw; w++) {
		grid[w] = [];
		for (var h = 0; h < arrh; h++) {
			grid[w][h] = 0;
		}
	}
	carve_passages_from(0, 0, grid);
}

function carve_passages_from(cx, cy, grid) {
  var directions = shuffle(dirs)

  directions.forEach(function(direction) {
    var nx = cx + DX[direction]
      , ny = cy + DY[direction]

    if (ny >= 0 && ny <= (grid.length - 1) && nx >= 0
      && nx <= (grid.length - 1) && grid[ny][nx] === 0) {
      grid[cy][cx] += dirsValue[direction]
      grid[ny][nx] += OPPOSITE[direction]
      window.setTimeout(step, 1, nx, ny, grid);
    }
  })
}

function step(nx, ny, grid) {
	console.log('stepping');
	tick();
	carve_passages_from(nx, ny, grid)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function corner(s) {
	if (s == 'N') return ''
}
