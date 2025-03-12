import type { Rollable } from "./dice";

/**
 * This class wraps around another {@link Rollable}.
 * When the {@link RaiseRollable#roll} function is called, 
 * the inner Rollable is rolled, and the number of raises is calculated.
 * 
 * I.e with a target_number of 4, if a Rollable rolls 4, 1 is returned:
 * 0 -> 0
 * 2 -> 0
 * 4 -> 1
 * 6 -> 1
 * 8 -> 2
 * etc.
 *
 * @implements Rollable
 */
export class RaiseRollable implements Rollable
{
    private rollable: Rollable;
    private target_number: number;

    /**
     * Constructs an instance of the {@link RaiseRollable} class.
     *
     * @param {Rollable} rollable - Any die or Rollable
     * @param {number} [target_number] - The target number that the rollable should be compared against. Defaults to 4.
     */
    public constructor(rollable: Rollable, target_number: number = 4)
    {
        this.rollable = rollable;
        this.target_number = target_number
    }

    public roll(): number {
        return calcRaises(this.rollable.roll(), this.target_number);
    }
}


/**
 * This function calculates the number of raises a rolled number is compared to its target number.
 * In SWADE, a raise happens when a die rolls 4 higher than its target, with an additional raise for 
 * every additional 4 above.
 * I.e for a TN of 4, 1-3 is a failure, 4-7 is a success (1 raise) 8-11 is two raises.
 * Note that in SWADE a success is technically not a raise, so 8-11 is just *one* raise,
 * but in order to be consistent and code things, we're going to treat a success as if it's 1 raise,
 * and a failure like 0 raises.
 *
 * @param {number} result - The rolled number that must meet or exceed the target number
 * @param {number} target_number - The target number. Defaults to 4 (as is the default in SWADE)
 * @returns {number} The number of raises rolled. Note that one success without any raises returns 1, 
 * which is not how SWADE mechanically works, but it makes more sense to calculate it as 1 here.
 */
export function calcRaises(result: number, target_number: number = 4): number
{
    // If the result doesn't beat the target_number,
    // it's hard set to 0 since it's a failure.
    if(result < target_number)
    {
        return 0;
    }
    return Math.floor((result - target_number) / 4) + 1;
}
