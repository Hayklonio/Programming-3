module.exports=
class Farmer extends LivingCreature {
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