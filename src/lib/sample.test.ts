import { describe, expect, test } from "vitest"
import { ExplodingDie, WildDie } from "./dice";
import { sampleDistribution, type SampleDistribution } from "./sample";

describe("sampleDistribution", () => {
    test("takes the correct number of samples", () => {
        const die = new WildDie(4);
        const distribution = sampleDistribution(die, 100);
        let sum = 0;
        for(const sample of distribution)
        {
            sum += sample.count;
        }
        expect(sum).toBe(100);
    });
    test("generates samples correctly", () => {
        const die = new ExplodingDie(4, () => 0.49);
        const distribution = sampleDistribution(die, 100);
        expect(distribution["results"].size).toBe(1);
        expect(distribution["results"].has(2)).toBe(true);
        expect(distribution["results"].get(2)).toBe(100);
        expect(distribution["results"].has(3)).toBeFalsy();
    });
});

describe("sortDistribution", () => {
    test("sorts output arryay correctly", () => {
        const die = new WildDie(4);
        const distribution = sampleDistribution(die, 100);
        const sorted = distribution.sort();
        expect(sorted).toSatisfy(isSorted);
    });
});

function isSorted(distributionMap: SampleDistribution ): boolean
{
    // Gets the first element of the distribution
    let previous = distributionMap[Symbol.iterator]().next().value;
    for(const elem of distributionMap)
    {
        if (previous.result > elem.result)
        {
            console.error(`Distribution was not sorted! Result ${previous.result} (count: ${previous.count}) was greater than subsequent result ${elem.result} (count: ${elem.count})`)
            return false;
        }
        previous = elem;
    }

    return true;
}


