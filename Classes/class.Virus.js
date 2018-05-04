module.exports =
    class Virus extends LivingCreature {
        constructor(x, y, index) {
            super(x, y, index)
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
                matrix[nory][norx] = 4;
                matrix[this.y][this.x] = 0;

                this.x = norx;
                this.y = nory;
            }
        }

        eat() {
            if (xotakerArr.length > gishatichArr.length) {
                var norVandak = this.yntrelVandak(2);
                var norvandak = random(norVandak);
                if (norvandak) {
                    var norx = norvandak[0];
                    var nory = norvandak[1];
                    matrix[nory][norx] = 4;
                    matrix[this.y][this.x] = 0;

                    this.y = nory;
                    this.x = norx;

                    for (var i in xotakerArr) {
                        if ((nory == xotakerArr[i].y) && (norx == xotakerArr[i].x)) {
                            xotakerArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    this.move();
                }
            }

            else if (xotakerArr.length <= gishatichArr.length) {
                var norVandak = this.yntrelVandak(3);
                var norvandak = random(norVandak);
                if (norvandak) {
                    var norx = norvandak[0];
                    var nory = norvandak[1];
                    matrix[nory][norx] = 4;
                    matrix[this.y][this.x] = 0;

                    this.y = nory;
                    this.x = norx;

                    for (var i in gishatichArr) {
                        if ((nory == gishatichArr[i].y) && (norx == gishatichArr[i].x)) {
                            gishatichArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    this.move();
                }
            }
        }
        die() {
            matrix[this.y][this.x] = 0;
            for (var i in virusArr) {
                if ((virusArr[i].y == this.y) && (this.x == virusArr[i].x)) {
                    virusArr.splice(i, 1);
                    break;
                }

            }

        }
    }