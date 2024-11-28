import { describe, expect, test } from "vitest"
import { ExplodingDie, WildDie } from "./dice";
import { sampleDistribution, sortDistribution } from "./sample";

describe("sampleDistribution", () => {
    test("takes the correct number of samples", () => {
        const die = new WildDie(4);
        const distribution = sampleDistribution(die, 100);
        let sum = 0;
        for(const count of distribution.values())
        {
            sum += count;
        }
        expect(sum).toBe(100);
    });
    test("generates samples correctly", () => {
        const die = new ExplodingDie(4, () => 0.49);
        const distribution = sampleDistribution(die, 100);
        expect(distribution.size).toBe(1);
        expect(distribution.has(2)).toBe(true);
        expect(distribution.get(2)).toBe(100);
        expect(distribution.has(3)).toBeFalsy();
    });
});

describe("sortDistribution", () => {
    test("sorts output arryay correctly", () => {
        const die = new WildDie(4);
        const distribution = sampleDistribution(die, 100);
        const sorted = sortDistribution(distribution);
        expect(sorted).toSatisfy(isSorted);
    });
});

function isSorted(distributionMap: Array<[number, number]>): boolean
{
    let previous = distributionMap[0];
    for(const elem of distributionMap)
    {
        if (previous[0] > elem[0])
        {
            return false;
        }
        previous = elem;
    }

    return true;
}


