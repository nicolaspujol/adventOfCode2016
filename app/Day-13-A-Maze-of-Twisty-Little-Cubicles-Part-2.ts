/*
--- Day 13: A Maze of Twisty Little Cubicles ---

How many locations (distinct x,y coordinates, including your starting location) can you reach in at most 50 steps?
*/

namespace AdventOfCodeDay13Part2 {
    // Interfaces
    interface ICoordinatesObject {
        "x": number;
        "y": number;
    }

    class AMazeOfTwistyLittleCubicles {

        private _input: number;
        private _objective: ICoordinatesObject;
        private _mapSize: ICoordinatesObject;

        public constructor(input: number, objective: ICoordinatesObject) {
            this._input = input;
            this._objective = objective;
            this._mapSize = { "x": 50, "y": 50 };
        }

        public getFewestNumberOfSteps(): number | boolean {
            let map: Array<Array<number | boolean>> = this.setMap();
            this.getPath(map, (mapArr: Array<Array<boolean>>, length: number) => length < 50);
            return map.reduce(
                    (s1: number, row: Array<number>) => s1 +
                        row.reduce(((s2: number, item: number) => typeof item === "number" ? s2 + 1 : s2), 0),
                    0
            );
        }

        private setMap(): Array<Array<number | boolean>> {
            let map: Array<Array<number | boolean>> = [];
            for (let x: number = 0; x < this._mapSize.x; x += 1) {
                map.push([]);
                for (let y: number = 0; y < this._mapSize.y; y += 1) {
                    let r: number = x * x + 3 * x + 2 * x * y + y + y * y + this._input;
                    let ones: Array<string> = r.toString(2).split("").filter((b: string) => b === "1");
                    map[x][y] = ones.length % 2 === 0;
                }
            }
            map[1][1] = 0;
            return map;
        }

        private getPath(map: Array<Array<number | boolean>>, callback: Function): void {
            let length: number = 0;
            while (callback(map, length)) {
                length += 1;
                for (let x: number = 0; x < this._mapSize.x; x += 1) {
                    for (let y: number = 0; y < this._mapSize.y; y += 1) {
                        if (map[x][y] !== length - 1) {
                            continue;
                        }
                        map[x][y - 1] = map[x][y - 1] === true ? length : map[x][y - 1];
                        map[x][y + 1] = map[x][y + 1] === true ? length : map[x][y + 1];
                        if (x - 1 >= 0) {
                            map[x - 1][y] = map[x - 1][y] === true ? length : map[x - 1][y];
                        }
                        if (x + 1 < this._mapSize.x) {
                            map[x + 1][y] = map[x + 1][y] === true ? length : map[x + 1][y];
                        }
                    }
                }
            }
        }
    }

    /**
     * TESTS
     */
    interface ITestInputsObject {
        "input": number;
        "result": number;
    }

    let testInputs: Array<ITestInputsObject> = [
        {
            "input": 10,
            "result": 151
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: AMazeOfTwistyLittleCubicles = new AMazeOfTwistyLittleCubicles(testInput.input, {
            "x": 7,
            "y": 4
        });
        let test: number | boolean = codeTest.getFewestNumberOfSteps();

        if (test !== testInput.result) {
            throw "Test failed: (" + typeof test + ")" + test +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: number = 1358;

    let solution: AMazeOfTwistyLittleCubicles = new AMazeOfTwistyLittleCubicles(input, { "x": 31, "y": 39 });
    console.log("Max locations in 50 steps: ", solution.getFewestNumberOfSteps());
}
