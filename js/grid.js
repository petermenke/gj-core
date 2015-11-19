(function() {

function Grid(w, h, cw, ch) {
    this.Container_constructor();
    this.width = w;
    this.height = h;

    this.cellw = cw;
    this.cellh = ch;

    // Placefolders
    for (var i = 0; i < w * h; i++)
        this.addChild(null);
}
var p = createjs.extend(Grid, createjs.Container);

p.draw = function(ctx, ignoreCache) {
    this.Container_draw(ctx, ignoreCache);
    // add custom logic here.
}

p.set = function(x, y, bitmap) {
    bitmap.x = this.cellw * x;
    bitmap.y = this.cellh * y;
    var index = y * this.width + x;
    console.log(index);
    console.log(bitmap.x + ', ' + bitmap.y);
    this.addChildAt(bitmap, index);
}

p.get = function(x, y) {
    return this.getChildAt(y * this.height + x);
}

p.remove = function(x, y) {
    this.removeChildAt(y * this.height + x);
}

p.fill = function(bitmap) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            this.set(x, y, bitmap.clone());
        }
    }
}

window.Grid = createjs.promote(Grid, "Container");
}());
