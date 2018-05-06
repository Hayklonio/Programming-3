var express = require("express");
var app = express();
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("public");
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});

setInterval(function draw() {
    background("#acacac");
    for (var i in global.grassArr) {
        global.grassArr[i].bazmanal();
        global.grassArr[i].bazmanal();
    }
    for (var i in global.xotakerArr) {
        global.xotakerArr[i].eat();
    }
    for (var i in global.gishatichArr) {
        global.gishatichArr[i].eat();
    }
    if ((global.gishatichArr.length + global.xotakerArr.length) > global.grassArr.length / 8) {
        if (global.xotakerArr.length > global.gishatichArr.length) {
            var vx = Math.round(Math.random() * (m - 1));
            var vy = Math.round(Math.random() * (n - 1));
            while (matrix[vy][vx] != 2) {
                vx = Math.round(Math.random() * (m - 1));
                vy = Math.round(Math.random() * (n - 1));
            }
            global.virusArr.push(new Virus(vx, vy));
            matrix[vy][vx] = 4;
            for (var i in global.xotakerArr) {
                if ((matrix[vy] == global.xotakerArr[i][1]) && (matrix[vx] == global.xotakerArr[i][0])) {
                    global.xotakerArr.splice(i, 1);
                }
            }
        }
        else if (global.xotakerArr.length <= global.gishatichArr.length) {
            var vx = Math.round(Math.random() * (m - 1));
            var vy = Math.round(Math.random() * (n - 1));
            while (matrix[vy][vx] != 3) {
                vx = Math.round(Math.random() * (m - 1));
                vy = Math.round(Math.random() * (n - 1));
            }
            global.virusArr.push(new Virus(vx, vy));
            matrix[vy][vx] = 4;
            for (var i in global.gishatichArr) {
                if ((matrix[vy] == global.gishatichArr[i][1]) && (matrix[vx] == global.gishatichArr[i][0])) {
                    global.gishatichArr.splice(i, 1);
                }
            }
        }
    }

    for (var i in global.virusArr) {
        if (infectAmount < 4) {
            global.virusArr[i].eat();
            infectAmount++;
        }
        else {
            global.virusArr[i].die();
            infectAmount = 0;
        }
    }
    if (global.gishatichArr.length + global.xotakerArr.length <= global.grassArr.length / 8) {
        for (var i in global.virusArr) {
            global.virusArr[i].die();
        }
    }

    if ((global.grassArr.length < n * m / 1.5) || (global.xotakerArr.length <= 5)) {
        var fx = Math.round(Math.random() * (m - 1));
        var fy = Math.round(Math.random() * (n - 1));
        while (matrix[fy][fx] != 2) {
            fx = Math.round(Math.random() * (m - 1));
            fy = Math.round(Math.random() * (n - 1));
        }
        global.farmerArr.push(new Farmer(fx, fy));
    }

    for (var i in global.farmerArr) {
        if (farmAmount < 6) {
            global.farmerArr[i].farm();
            farmAmount++;
        }
        else {
            global.farmerArr[i].leave();
            farmAmount = 0;
        }
    }
    if ((global.gishatichArr.length < 5) && (global.xotakerArr.length > 5)) {
        var gx = Math.round(Math.random() * (m - 1));
        var gy = Math.round(Math.random() * (n - 1));
        while (matrix[gy][gx] != 2) {
            gx = Math.round(Math.random() * (m - 1));
            gy = Math.round(Math.random() * (n - 1));
        }
        global.gishatichArr.push(new Gishatich(gx, gy));

        for (var i in global.gishatichArr) {
            global.gishatichArr[i].move();
        }
    }
}, 1000);

var server = require('http').Server(app);
var io = require('socket.io')(server);