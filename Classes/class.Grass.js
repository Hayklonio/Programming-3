module.exports =
    class Grass extends LivingCreature {
        bazmanal() {
            this.multiply++;
            var norVandak = random(this.yntrelVandak(0));

            if (norVandak && this.multiply >= 8) {
                var norx = norVandak[0];
                var nory = norVandak[1];
                matrix[nory][norx] = 1;

                var norXot = new Grass(norx, nory);
                grassArr.push(norXot);
                this.multiply = 0;
            }
        }
    }