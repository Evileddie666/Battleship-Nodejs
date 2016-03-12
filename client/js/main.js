/**
 * Created by Wim on 11-3-2016.
 */
var grid = {}, ships = [], shipSize = 2;

var Title = function (posX, posY, height, width, id) {
    this.clicked = false;

    this.elem = document.createElement("div");
    this.elem.className = "title";
    this.elem.id = id;
    this.elem.style.width = (width - 4) + "px";
    this.elem.style.height = (height - 4) + "px";

    this.elem.addEventListener("click", function () {
        placeShip(this);
    });

    this.draw = function (parent) {
        parent.appendChild(this.elem);
    };
};

var Grid = function (height, width, titleX, titleY) {
    this.titleWidth = width / titleX;
    this.titleHeight = height / titleY;

    this.titles = [];
    for (var i = 0; i < titleY; i++) {
        this.titles[i] = [];
    }

    this.container = document.createElement("div");
    this.container.id = "grid";
    this.container.style.width = width + "px";
    this.container.style.height = height + "px";

    this.draw = function () {
        document.body.appendChild(this.container);

        var id = 0;
        for (var y = 0; y < titleY; y++) {
            for (var x = 0; x < titleX; x++) {
                var title = new Title(x, y, this.titleHeight, this.titleWidth, id);
                title.draw(this.container);
                this.titles[x][y] = title;
                id++;
            }
        }
    };
};

var Ship = function (size, posX, posY) {

};

var placeShip = function (title) {
    var ship = new Ship(shipSize, title.posX, title.posY);
    ships.push(ship);

    for(var i = 0; i < shipSize; i++){
        var id = Number(title.id) + i * 15;
        titleElem = document.getElementById(id) ;
        titleElem.style.backgroundColor = "blue";
    }
};

var setShipSize = function(size){
    shipSize = size;
}

grid = new Grid(960, 960, 15, 15);
grid.draw();

