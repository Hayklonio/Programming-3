class Xotaker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hunger = 0;
        this.multiply = Math.round(Math.random() * 8);
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;

    }

    move() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {

            var norx = norVandak[0];
            var nory = norVandak[1];
            matrix[nory][norx] = 2;
            matrix[this.y][this.x] = 0;

            this.x = norx;
            this.y = nory;
        }
    }

    eat() {
        var norVandak = this.yntrelVandak(1);
        var norvandak = random(norVandak);
        if (norvandak) {
            var norx = norvandak[0];
            var nory = norvandak[1];
            matrix[nory][norx] = 2;
            matrix[this.y][this.x] = 0;

            this.y = nory;
            this.x = norx;

            for (var i in grassArr) {
                if ((nory == grassArr[i].y) && (norx == grassArr[i].x)) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.multiply++;
            if (this.multiply >= 5) {
                this.bazmanal();
                this.multiply = 0;
                this.hunger--;
            }
        }
        else {
            this.move();
            this.hunger--;
            if (this.hunger <= -5) {
                this.mahanal();
            }
        }
    }
    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {
            var norx = norVandak[0];
            var nory = norVandak[1];
            matrix[nory][norx] = 2;

            var norXotaker = new Xotaker(norx, nory);
            xotakerArr.push(norXotaker);
        }
    }

    mahanal() {
        matrix[this.y][this.x] = 0;
        for (var i in xotakerArr) {
            if ((xotakerArr[i].y == this.y) && (this.x == xotakerArr[i].x)) {
                xotakerArr.splice(i, 1);
                break;
            }
        }

    }
}
