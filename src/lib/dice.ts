export interface Rollable {
    roll(): number;
}

export class ExplodingDie implements Rollable {
    dieSize: number;
    random: () => number;

    constructor(dieSize: number, random=Math.random) {
        this.dieSize = dieSize;
        this.random = random;
    }

    roll(): number {
        let total = 0;
        let rollResult = 0;

        do {
            rollResult = Math.floor(this.random() * this.dieSize) + 1;
            total += rollResult;
        }
        // Exploding dice means that if we hit the highest number on a dice, we
        // roll it again and add it to the total
        while (rollResult === this.dieSize)

        return total;
    }
}

export class WildDie implements Rollable {
    dieSize: number;
    random: () => number;

    constructor(dieSize: number, random=Math.random) {
        this.dieSize = dieSize;
        this.random = random;
    }

    roll(): number {
        const wildDie = new ExplodingDie(6, this.random);
        const skillDie = new ExplodingDie(this.dieSize, this.random);
        return Math.max(wildDie.roll(), skillDie.roll());
    }
}
