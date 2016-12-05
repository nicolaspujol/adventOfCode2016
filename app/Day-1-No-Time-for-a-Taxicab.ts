/*
--- Day 1: No Time for a Taxicab ---

Santa's sleigh uses a very high-precision clock to guide its movements,
and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny.
To save Christmas, Santa needs you to retrieve all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the advent calendar;
the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately,
is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here,
and nobody had time to work them out further.

The Document indicates that you should start at the given coordinates (where you just landed) and face North.
Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees,
then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though,
so you take a moment and work out the destination. Given that you can only walk on the street grid of the city,
how far is the shortest path to the destination?

For example:

Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
R5, L5, R5, R3 leaves you 12 blocks away.

How many blocks away is Easter Bunny HQ?
*/

namespace AdventOfCode {
    // Interfaces
    interface ICoordinateObject {
        x: number;
        y: number;
    }

    // Enums
    enum Direction {
        North = 0,
        East = 1,
        South = 2,
        West = 3
    }

    export class NoTimeforATaxicab {
        private _path: Array<string>;
        private _coord: Array<number>;
        private _direction: Direction;

        public constructor(path: string) {
            this._path = path.split(", ");
            this._direction = Direction.North;
            this._coord = [0, 0];
        };

        public getTotalBlocks(): number {
            for (let step of this._path) {
                this._direction = this.getNextDir(step[0]);
                this._coord = this.getNextCoord(parseInt(step.substring(1), 10));
            }

            return (Math.abs(this._coord[0]) + Math.abs(this._coord[1]));
        }

        private getNextCoord(distance: number): Array<number> {
            switch (this._direction) {
                case Direction.North: return [this._coord[0] + distance, this._coord[1]];
                case Direction.East: return [this._coord[0], this._coord[1] + distance];
                case Direction.South: return [this._coord[0] - distance, this._coord[1]];
                case Direction.West: return [this._coord[0], this._coord[1] - distance];
            }
            return undefined;
        }

        private getNextDir(turnDirection: string): number {
            let newDirection: number = this._direction + (turnDirection === "L" ? -1 : 1);

            if (newDirection === -1) {
                return Direction.West;
            }
            if (newDirection === 4) {
                return Direction.North;
            }
            return newDirection;
        }
    }
}

/**
 * TESTS
 */
interface ITestInputs1Object {
    "input": string;
    "result": number;
}

let testInputs1: Array<ITestInputs1Object> = [
    {
        "input": "R2, L3",
        "result": 5
    },
    {
        "input": "R2, R2, R2",
        "result": 2
    },
    {
        "input": "R5, L5, R5, R3",
        "result": 12
    }
];

for (let testInput of testInputs1) {
    let distanceTest: AdventOfCode.NoTimeforATaxicab = new AdventOfCode.NoTimeforATaxicab(testInput.input);
    let distanceGet: number = distanceTest.getTotalBlocks();

    if (distanceGet !== testInput.result) {
        throw "Test failed: (" + typeof distanceGet + ")" + distanceGet +
        " !== (" + typeof testInput.result + ")" + testInput.result;
    }
}

/**
 * SOLUTION
 */
let input: string = "L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1, " +
    "L5, R1, R3, L5, R2, L2, R2, R1, L1, L3, L3, R4, R5, R4, L1, L189, L2, R2, L5, R5, R45, L3, R4, R77, L1, R1, " +
    "R194, R2, L5, L3, L2, L1, R5, L3, L3, L5, L5, L5, R2, L1, L2, L3, R2, R5, R4, L2, R3, R5, L2, L2, R3, L3, " +
    "L2, L1, L3, R5, R4, R3, R2, L1, R2, L5, R4, L5, L4, R4, L2, R5, L3, L2, R4, L1, L2, R2, R3, L2, L5, R1, R1, " +
    "R3, R4, R1, R2, R4, R5, L3, L5, L3, L3, R5, R4, R1, L3, R1, L3, R3, R3, R3, L1, R3, R4, L5, L3, L1, L5, L4, " +
    "R4, R1, L4, R3, R3, R5, R4, R3, R3, L1, L2, R1, L4, L4, L3, L4, L3, L5, R2, R4, L2";

let blocksAway: AdventOfCode.NoTimeforATaxicab = new AdventOfCode.NoTimeforATaxicab(input);

console.log("Blocks Away: ", blocksAway.getTotalBlocks());
