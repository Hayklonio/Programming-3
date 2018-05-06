//var socket = io();
var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var virusArr = [];
var farmerArr = [];
var matrix = [];
var n = Math.round(Math.random() * 50 + 10);
var m = Math.round(Math.random() * 50 + 10);
for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = Math.round(Math.random() * 3);
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y))
        }
        else if (matrix[y][x] == 2) {
            xotakerArr.push(new Xotaker(x, y))
        }
        else if (matrix[y][x] == 3) {
            var r = (Math.round(Math.random()))/2;
                matrix[y][x]+=r;
            gishatichArr.push(new Gishatich(x, y, r))
        }
    }
}

var side = 800 / n;

var farmAmount = 0;
var infectAmount = 0;
function setup() {
    noStroke();
    frameRate(60);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

}
setInterval(function draw() {
    noStroke();
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("brown");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3,5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].bazmanal();
        grassArr[i].bazmanal();
    }
    for (var i in xotakerArr) {
        xotakerArr[i].eat();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    if ((gishatichArr.length + xotakerArr.length) > grassArr.length / 8) {
        if (xotakerArr.length > gishatichArr.length) {
            var vx = Math.round(Math.random() * (m - 1));
            var vy = Math.round(Math.random() * (n - 1));
            while (matrix[vy][vx] != 2) {
                vx = Math.round(Math.random() * (m - 1));
                vy = Math.round(Math.random() * (n - 1));
            }
            virusArr.push(new Virus(vx, vy));
            matrix[vy][vx] = 4;
            for (var i in xotakerArr) {
                if ((matrix[vy] == xotakerArr[i][1]) && (matrix[vx] == xotakerArr[i][0])) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
        else if (xotakerArr.length <= gishatichArr.length) {
            var vx = Math.round(Math.random() * (m - 1));
            var vy = Math.round(Math.random() * (n - 1));
            while (matrix[vy][vx] != 3) {
                vx = Math.round(Math.random() * (m - 1));
                vy = Math.round(Math.random() * (n - 1));
            }
            virusArr.push(new Virus(vx, vy));
            matrix[vy][vx] = 4;
            for (var i in gishatichArr) {
                if ((matrix[vy] == gishatichArr[i][1]) && (matrix[vx] == gishatichArr[i][0])) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
    }

    for (var i in virusArr) {
        if (infectAmount < 4) {
            virusArr[i].eat();
            infectAmount++;
        }
        else {
            virusArr[i].die();
            infectAmount = 0;
        }
    }
    if (gishatichArr.length + xotakerArr.length <= grassArr.length / 8) {
        for (var i in virusArr) {
            virusArr[i].die();
        }
    }

    if ((grassArr.length < n * m / 1.5) || (xotakerArr.length <= 5)) {
        var fx = Math.round(Math.random() * (m - 1));
        var fy = Math.round(Math.random() * (n - 1));
        while (matrix[fy][fx] != 2) {
            fx = Math.round(Math.random() * (m - 1));
            fy = Math.round(Math.random() * (n - 1));
        }
        farmerArr.push(new Farmer(fx, fy));
    }

    for (var i in farmerArr) {
        if (farmAmount < 6) {
            farmerArr[i].farm();
            farmAmount++;
        }
        else {
            farmerArr[i].leave();
            farmAmount = 0;
        }
    }
    if ((gishatichArr.length < 5) && (xotakerArr.length > 5)) {
        var gx = Math.round(Math.random() * (m - 1));
        var gy = Math.round(Math.random() * (n - 1));
        while (matrix[gy][gx] != 2) {
            gx = Math.round(Math.random() * (m - 1));
            gy = Math.round(Math.random() * (n - 1));
        }
        gishatichArr.push(new Gishatich(gx, gy));

        for (var i in gishatichArr) {
            gishatichArr[i].move();
        }
    }
}, 200);