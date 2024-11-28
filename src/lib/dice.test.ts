import { describe, expect, test } from 'vitest';
import { ExplodingDie, WildDie } from './dice';

function mockRandom(result: number): (() => number)
{
    return () => {
        return result;
    }
}

describe('ExplodingDie test', () => {
    test('returns roll result', () => {
        const die = new ExplodingDie(4, mockRandom(0.74));
        expect(die.roll()).toBe(3);
    });

    test('explodes as expected', () => {
        const randomResult = [0.99, 0.99, 0.99, 0.1];
        let randomResultIndex = 0;

        const random = () => {
            randomResultIndex++;
            return randomResult[randomResultIndex - 1];
        };

        const die = new ExplodingDie(4, random);
        expect(die.roll()).toBe(13);
    });
});

describe('WildDie test', () => {
    test('returns greater roll result', () => {
        // Note this test depends on wild die running the wild die roll function
        // BEFORE the skill die. If the order becomes swapped, the roll result
        // will be different. Jank!
        const randomResult = [0.1, 0.5];
        let randomResultIndex = 0;

        const random = () => {
            randomResultIndex++;
            return randomResult[randomResultIndex - 1];
        };

        const die = new WildDie(4, random);
        expect(die.roll()).toBe(3);
    })
});
