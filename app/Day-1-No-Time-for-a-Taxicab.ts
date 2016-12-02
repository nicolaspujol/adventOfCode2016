/*
--- Day 1: No Time for a Taxicab ---

Santa's sleigh uses a very high-precision clock to guide its movements, and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny. To save Christmas, Santa needs you to retrieve all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.

The Document indicates that you should start at the given coordinates (where you just landed) and face North. Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination. Given that you can only walk on the street grid of the city, how far is the shortest path to the destination?

For example:

    Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
    R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
    R5, L5, R5, R3 leaves you 12 blocks away.

How many blocks away is Easter Bunny HQ?
*/

let input = "L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1, L5, R1, R3, L5, R2, L2, R2, R1, L1, L3, L3, R4, R5, R4, L1, L189, L2, R2, L5, R5, R45, L3, R4, R77, L1, R1, R194, R2, L5, L3, L2, L1, R5, L3, L3, L5, L5, L5, R2, L1, L2, L3, R2, R5, R4, L2, R3, R5, L2, L2, R3, L3, L2, L1, L3, R5, R4, R3, R2, L1, R2, L5, R4, L5, L4, R4, L2, R5, L3, L2, R4, L1, L2, R2, R3, L2, L5, R1, R1, R3, R4, R1, R2, R4, R5, L3, L5, L3, L3, R5, R4, R1, L3, R1, L3, R3, R3, R3, L1, R3, R4, L5, L3, L1, L5, L4, R4, R1, L4, R3, R3, R5, R4, R3, R3, L1, L2, R1, L4, L4, L3, L4, L3, L5, R2, R4, L2";
/*
let testInput1 = "R2, L3";
let testInput2 = "R2, R2, R2";
let testInput3 = "R5, L5, R5, R3";

nput = testInput1;*/

namespace adventOfCode {

    // Interfaces
    interface coordinateObject {
        x: number,
        y: number
    }

    export class NoTimeforATaxicab {
        private _path: Array<string>;
        private _coord: coordinateObject;
        private _direction: number;

        constructor(path: string) {
            this._path = path.split(", ");
            this._coord = { x: 0, y: 0 };
            this._direction = 0;
        };

        getDistance(): number {
            for (let i: number = 0; i < this._path.length; i++) {
                let instructions: Array<string> = (this._path[i]).match(/(L|R)([0-9]*)/);

                if (this._direction == 0) {
                    if (instructions[1] == "L") {
                        this._coord.x -= Number(instructions[2]);
                        this._direction = 3;
                    }
                    if (instructions[1] == "R") {
                        this._coord.x += Number(instructions[2]);
                        this._direction = 1;
                    }
                } else if (this._direction == 1) {
                    if (instructions[1] == "L") {
                        this._coord.y += Number(instructions[2]);
                        this._direction = 0;
                    }
                    if (instructions[1] == "R") {
                        this._coord.y -= Number(instructions[2]);
                        this._direction = 2;
                    }
                } else if (this._direction == 2) {
                    if (instructions[1] == "L") {
                        this._coord.x += Number(instructions[2]);
                        this._direction = 1;
                    }
                    if (instructions[1] == "R") {
                        this._coord.x -= Number(instructions[2]);
                        this._direction = 3;
                    }
                } else if (this._direction == 3) {
                    if (instructions[1] == "L") {
                        this._coord.y -= Number(instructions[2]);
                        this._direction = 2;
                    }
                    if (instructions[1] == "R") {
                        this._coord.y += Number(instructions[2]);
                        this._direction = 0;
                    }
                }
            };
            return (this._coord.x + this._coord.y);
        };
    };

};

let distance = new adventOfCode.NoTimeforATaxicab(input);
console.log(distance.getDistance());
