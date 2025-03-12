import { describe, expect, test } from 'vitest';
import { calcRaises, RaiseRollable } from './skill';
import type { Rollable } from './dice';
import { TestLive } from 'effect';

class TestRollable implements Rollable {
    private result: number;

    public constructor(result: number)
    {
        this.result = result;
    }

    public roll(): number
    {
        return this.result;
    }
}

describe("calcRaises tests", () => {
    test.each([
        [0,0],
        [1,0],
        [2,0],
        [3,0],
        [4,1],
        [5,1],
        [6,1],
        [7,1],
        [8,2],
        [9,2],
        [10,2],
        [13,3],
        [14,3],
        [1069,267],
        [-100,0],
    ])("calcRaises(%i) returns %i", (a, expected) => {
        expect(calcRaises(a)).toBe(expected)
    });
    test.each([
        [0, 0, 1],
        [0, 1, 0],
        [1, 1, 1],
        [7, 3, 2],
        [-5, -5, 1],
        [-1, -5, 2],
        [0, 99999, 0],
        [-100, -99, 0],
    ])("calcRaises(%i, %i) returns %i", (a, b, expected) => {
        expect(calcRaises(a, b)).toBe(expected)
    });
});

describe("RaiseRollable tests", () => {
    test.each([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 1],
        [6, 1],
        [8, 2],
        [9, 2],
    ])("RaiseRollable rolls %i, returns %i", (a, expected) => {
        let testRollable = new TestRollable(a);
        let raiseRollable = new RaiseRollable(testRollable);
        expect(raiseRollable.roll()).toBe(expected);
    });
    test.each([
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [9, 10, 0],
        [11, 10, 1],
        [20, 10, 3],
    ])("RaiseRollable rolls %i with a target number of %i, returns %i", (a, b, expected) => {
        let testRollable = new TestRollable(a);
        let raiseRollable = new RaiseRollable(testRollable, b);
        expect(raiseRollable.roll()).toBe(expected);
    });
});

