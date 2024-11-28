import type { Rollable } from "./dice";

/**
 * Samples the random distribution of a given Rollable and returns it as a map,
 * where the keys of the map are the given rolled result, and the value is the
 * number of times it was rolled.
 *
 * @param {Rollable} die - a Rollable type.
 * @param {number} samples - The number of samples to take of the given
 * Rollable.
 * @returns {Map<number, number>} The table of results, where the key is the
 * result of any given roll, and the value is the number of times it was rolled.
 */
export function sampleDistribution(die: Rollable, samples: number): Map<number, number>
{
    let results = new Map<number, number>();

    for (let i=0;i<samples;i++)
    {
        const result = die.roll();
        addOrIncrement(results, result);
    }

    return results;
}

export function sortDistribution(map: Map<number, number>): Array<[number, number]>
{
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
}

function addOrIncrement(map: Map<number, number>, key: number)
{
    if (map.has(key))
    {
        // map.get() cannot returned undefined, we just checked that the map has
        // the key.
        const currentValue = map.get(key)!;
        map.set(key, currentValue + 1);
    }
    else
    {
        map.set(key, 1);
    }
}
