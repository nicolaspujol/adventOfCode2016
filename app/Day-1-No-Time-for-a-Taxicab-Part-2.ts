/*
--- Day 1: No Time for a Taxicab ---

Then, you notice the instructions continue on the back of the Recruiting Document.
Easter Bunny HQ is actually at the first location you visit twice.

For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.

How many blocks away is the first location you visit twice?
*/

namespace AdventOfCodeDay1Part2 {

    // Enums
    enum Direction {
        North = 0,
        East = 1,
        South = 2,
        West = 3
    }

    // Interfaces
    interface INextCoordObject {
        "new": Array<number>;
        "repeat": Array<number>;
    }

    class NoTimeforATaxicab {
        private _path: Array<string>;
        private _coord: Array<number>;
        private _prevCoord: Array<string>;
        private _direction: Direction;

        public constructor(path: string) {
            this._path = path.split(", ");
            this._direction = Direction.North;
            this._coord = [0, 0];
            this._prevCoord = [this._coord.toString()];
        };

        public getTotalBlocksVisitedTwice(): number {
            for (let step of this._path) {
                this._direction = this.getNextDir(step[0]);

                let result: INextCoordObject = this.nextMove(parseInt(step.substring(1), 10));

                this._coord = result.new;

                if (result.repeat) {
                    return (Math.abs(result.repeat[0]) + Math.abs(result.repeat[1]));
                }
            }
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

        private nextMove(distance: number): INextCoordObject {
            switch (this._direction) {
                case Direction.North: return this.getNextCoord(distance, 0);
                case Direction.East: return this.getNextCoord(0, distance);
                case Direction.South: return this.getNextCoord(-distance, 0);
                case Direction.West: return this.getNextCoord(0, -distance);
            }
            return undefined;
        }

        private getNextCoord(distanceNorth: number, distanceEast: number): INextCoordObject {
            let distance: number = distanceNorth !== 0 ? distanceNorth : distanceEast;
            let tempCoord: Array<number>;
            let repeatCoord: Array<number>;

            for (let i: number = 1; i <= Math.abs(distance); i++) {
                let dir: number = distance > 0 ? i : -i;

                tempCoord = distanceNorth !== 0 ?
                    [this._coord[0] + dir, this._coord[1]] :
                    [this._coord[0], this._coord[1] + dir];

                if (this._prevCoord.indexOf(tempCoord.toString()) !== -1) {
                    repeatCoord = tempCoord;
                    break;
                }

                this._prevCoord.push(tempCoord.toString());
            }
            return {
                "new": tempCoord,
                "repeat": repeatCoord
            };
        }
    }

    /**
     * TESTS
     */
    interface ITestInputsObject {
        "input": string;
        "result": number;
    }

    let testInputs: Array<ITestInputsObject> = [
        {
            "input": "R8, R4, R4, R8",
            "result": 4
        }
    ];

    for (let testInput of testInputs) {
        let distanceTest: NoTimeforATaxicab = new NoTimeforATaxicab(testInput.input);
        let distanceGet: number = distanceTest.getTotalBlocksVisitedTwice();

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

    let blocksAway: NoTimeforATaxicab = new NoTimeforATaxicab(input);

    console.log("Blocks Away Visit Twice: ", blocksAway.getTotalBlocksVisitedTwice());

}
