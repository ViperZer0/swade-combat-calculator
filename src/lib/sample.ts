import type { Rollable } from "./dice";

/* A sample represents the number of rolls that met a specific outcome.
 * Result represents the roll that was obtained
 * Count is the number of times that roll was obtained
 */
export interface Sample
{
    result: number,
    count: number,
}

/* Defines a calculated sample distribution for a Rollable
 * (or really any histogram data type if you wanted)
 */
export interface SampleDistribution extends Iterable<Sample>
{
}

export class HashmapSampleDistribution implements SampleDistribution {
    private results: Map<number, number>;

    public constructor()
    {
        this.results = new Map<number, number>();
    }

    /**
     * Increments the recorded occurences of a given result.
     * If the result has occured already, it increments the existing stored count
     * If it doesn't, it creates it and initializes it to 1 (the result has occured only once)
     * @param {number} result - The result to track the number of occurences of
     */
    public increment(result: number): void
    {
        if (this.results.has(result))
        {
            const currentCount = this.results.get(result)!;
            this.results.set(result, currentCount + 1);
        }
        else
        {
            this.results.set(result, 1);
        }
    }

    // Implements the iterator protocol for this object
    [Symbol.iterator](): IteratorObject<Sample, any, any> {
        // Maps the internal map to an array of samples and returns the iterator for that array.
        let map: IteratorObject<Sample, any, any> = this.results.entries().map((v: [number, number]): Sample => ({ result: v[0], count: v[1]}));
        return map;
    }

    /**
     * Sorts the internal map of samples so that they are in order from the lowest result to the highest.
     *
     * @returns {SortedSampleDistribution} A new object that's a sorted list of samples.
     */
    public sort(): SortedSampleDistribution
    {
        // Sort the map of existing results so that the results are added in incremental order.
        // And then converts them from a tuple to a proper Sample type. Easy!
        const sortedResults = Array.from(this.results.entries()).sort((a, b) => a[0] - b[0]).map((v: [number, number]): Sample => ({ result: v[0], count: v[1]}));
        return new SortedSampleDistribution(sortedResults);
    }
}

/* Represents a sorted {@link SampleDistribution}. The map has been turned into an array of tuples,
 * with the first value of the tuple being the numerical result (which should be in ascending order
 * since it's sorted), and the second value is the number of times that given result was rolled
 */
export class SortedSampleDistribution implements SampleDistribution {
    private results: Array<Sample>;

    public constructor(results: Array<Sample> = [])
    {
        if(results.length == 0)
        {
            this.results = new Array<Sample>();
            return;
        }
        this.results = results;
    }

    // Iterates over the array of samples. We kinda just assume the sample distribution is sorted.
    [Symbol.iterator](): IteratorObject<Sample, any, any> {
        return this.results[Symbol.iterator]();
    }
}

/**
 * Samples the random distribution of a given Rollable and returns it as a map,
 * where the keys of the map are the given rolled result, and the value is the
 * number of times it was rolled.
 *
 * @param {Rollable} die - a Rollable type.
 * @param {number} samples - The number of samples to take of the given
 * Rollable.
 * @returns {SampleDistribution} - A new distribution tracking the results rolled.
 */
export function sampleDistribution(die: Rollable, samples: number): HashmapSampleDistribution
{
    let distribution = new HashmapSampleDistribution();

    for (let i=0;i<samples;i++)
    {
        const result = die.roll();
        distribution.increment(result);
    }

    return distribution
}

