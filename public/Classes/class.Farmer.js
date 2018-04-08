class Farmer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

    farm() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {
            var norx = norVandak[0];
            var nory = norVandak[1];

            matrix[nory][norx] = 5;
            matrix[this.y][this.x] = 1;

            grassArr.push(new Grass(this.x, this.y));

            this.x = norx;
            this.y = nory;
        }
    }
    leave() {
        matrix[this.y][this.x] = 0;
        for (var i in farmerArr) {
            if ((farmerArr[i].y == this.y) && (this.x == farmerArr[i].x)) {
                farmerArr.splice(i, 1);
                break;
            }

        }

    }
}