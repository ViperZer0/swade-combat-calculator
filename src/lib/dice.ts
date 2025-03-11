export interface Rollable
{
    roll(): number;
}

/* Represents an "exploding" die which is any die where rolling the
 * maximum number means you roll again and add it to the previous roll.
 * I.e player rolls an 8 on a d8, they roll again, and add the resulting roll to the total.
 * If the dice explodes 3 times, they add 8+8+8+2 or whatever.
 */
export class ExplodingDie implements Rollable
{
    private dieSize: number;
    private random: () => number;

    /**
     * Constructs an instance of the {@link ExplodingDie} class. 
     *
     * @param {number} dieSize - The size of the die. Can be any positive number.
     * @param {} [random] - Any function that returns an integer, defaults to {@link Math.random}
     */
    public constructor(dieSize: number, random=Math.random) {
        this.dieSize = dieSize;
        this.random = random;
    }

    public roll(): number {
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

/* Represents a wild die in SWADE, which is a type of roll where you roll
 * a player's trait die (which depends on the skill in question) and a d6 and take the highest
 * of the two rolls. Both the trait die and the d6 can explode.
 */
export class WildDie implements Rollable
{
    private dieSize: number;
    private random: () => number;

    /**
     * Constructs an instance of the {@link WildDie} class. 
     *
     * @param {number} dieSize - The size of the die. Can be any positive number.
     * @param {} [random] - Any function that returns an integer, defaults to {@link Math.random}
     */
    public constructor(dieSize: number, random=Math.random) {
        this.dieSize = dieSize;
        this.random = random;
    }

    public roll(): number {
        const wildDie = new ExplodingDie(6, this.random);
        const skillDie = new ExplodingDie(this.dieSize, this.random);
        return Math.max(wildDie.roll(), skillDie.roll());
    }
}

