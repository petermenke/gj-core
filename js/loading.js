(function() {

function Loading(w, h, cw, ch) {
    this.Container_constructor();

    var text = new createjs.Text("Loading . . .", "60px Arial", "black");
	text.x = 100;
	text.y = 100;
	text.name = "loading";
	this.addChild(text);

	var x = text.x;
	var width = 0;
	var y = text.y + text.getBounds().height + 5;
	var height = 2;

	var progressbar = new createjs.Shape();
	progressbar.name = "progress";
	progressbar.graphics.beginFill("red").drawRect(x, y, width, height);
	this.addChild(progressbar);
}
var p = createjs.extend(Loading, createjs.Container);

p.progress = function(prog) {
    var text = this.getChildByName('loading');

    var x = text.x;
    var width = text.getBounds().width * prog;
    var y = text.y + text.getBounds().height + 5;
    var height = 2;

    var progressbar = this.getChildByName('progress');
    progressbar.graphics.beginFill("red").drawRect(x, y, width, height);
}



window.Loading = createjs.promote(Loading, "Container");
}());
