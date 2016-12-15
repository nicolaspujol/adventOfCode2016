/*
--- Day 13: A Maze of Twisty Little Cubicles ---

You arrive at the first floor of this new building to discover a much less welcoming environment than
the shiny atrium of the last one. Instead, you are in a maze of twisty little cubicles, all alike.

Every location in this area is addressed by a pair of non-negative integers (x,y).
Each such coordinate is either a wall or an open space. You can't move diagonally.
The cube maze starts at 0,0 and seems to extend infinitely toward positive x and y;
negative values are invalid, as they represent a location outside the building. You are in a small waiting area at 1,1.

While it seems chaotic, a nearby morale-boosting poster explains, the layout is actually quite logical.
You can determine whether a given x,y coordinate will be a wall or an open space using a simple system:

    - Find x*x + 3*x + 2*x*y + y + y*y.
    - Add the office designer's favorite number (your puzzle input).
    - Find the binary representation of that sum; count the number of bits that are 1.
        - If the number of bits that are 1 is even, it's an open space.
        - If the number of bits that are 1 is odd, it's a wall.

For example, if the office designer's favorite number were 10, drawing walls as # and open spaces as .,
the corner of the building containing 0,0 would look like this:

  0123456789
0 .#.####.##
1 ..#..#...#
2 #....##...
3 ###.#.###.
4 .##..#..#.
5 ..##....#.
6 #...##.###

Now, suppose you wanted to reach 7,4. The shortest route you could take is marked as O:

  0123456789
0 .#.####.##
1 .O#..#...#
2 #OOO.##...
3 ###O#.###.
4 .##OO#OO#.
5 ..##OOO.#.
6 #...##.###

Thus, reaching 7,4 would take a minimum of 11 steps (starting from your current location, 1,1).

What is the fewest number of steps required for you to reach 31,39?
*/

namespace AdventOfCodeDay13Part1 {
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
            this._mapSize = { "x": 50, "y": 50};
        }

        public getFewestNumberOfSteps(): number|boolean {
            let map: Array<Array<number|boolean>> = this.setMap();
            this.getPath(map, (mapArr: Array<Array<boolean>>) =>
                mapArr[this._objective.x][this._objective.y] === true);
            return map[this._objective.x][this._objective.y];
        }

        private setMap(): Array<Array<number|boolean>> {
            let map: Array<Array<number|boolean>> = [];
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

        private getPath(map: Array<Array<number|boolean>>, callback: Function): void {
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
            "result": 11
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: AMazeOfTwistyLittleCubicles = new AMazeOfTwistyLittleCubicles(testInput.input, {
            "x": 7,
            "y": 4
        });
        let test: number|boolean = codeTest.getFewestNumberOfSteps();

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
    console.log("Fewest number of steps required: ", solution.getFewestNumberOfSteps());
}
