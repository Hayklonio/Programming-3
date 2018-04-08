class Gishatich extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.hunger = 0;
        this.multiply = Math.round(Math.random() * 8);
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
        return super.yntrelVandak(ch);
    }

    move() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {

            var norx = norVandak[0];
            var nory = norVandak[1];
            matrix[nory][norx] = 3;
            matrix[this.y][this.x] = 0;

            this.x = norx;
            this.y = nory;
        }
    }

    eat() {
        var norVandak = this.yntrelVandak(2);
        var norvandak = random(norVandak);
        if (norvandak) {
            var norx = norvandak[0];
            var nory = norvandak[1];
            matrix[nory][norx] = 3;
            matrix[this.y][this.x] = 0;

            this.y = nory;
            this.x = norx;

            for (var i in xotakerArr) {
                if ((nory == xotakerArr[i].y) && (norx == xotakerArr[i].x)) {
                    xotakerArr.splice(i, 1);
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
            if (xotakerArr.length > gishatichArr.length) {
                this.hunger--;
            }
            else {
                this.hunger -= 2;
            }
            if (this.hunger <= -4) {
                this.mahanal();
            }
        }
    }
    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {
            var norx = norVandak[0];
            var nory = norVandak[1];
            matrix[nory][norx] = 3;

            var norGishatich = new Gishatich(norx, nory);
            gishatichArr.push(norGishatich);
        }
    }

    mahanal() {
        matrix[this.y][this.x] = 0;
        for (var i in gishatichArr) {
            if ((gishatichArr[i].y == this.y) && (this.x == gishatichArr[i].x)) {
                gishatichArr.splice(i, 1);
                break;
            }

        }

    }
}