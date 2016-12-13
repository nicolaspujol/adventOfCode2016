/*
--- Day 8: Two-Factor Authentication ---

You notice that the screen is only capable of displaying capital letters;
in the font it uses, each letter is 5 pixels wide and 6 tall.

After you swipe your card, what code is the screen trying to display?
*/

namespace AdventOfCodeDay8Part2 {
    // Interfaces
    interface IScreenObject {
        "cols": number;
        "rows": number;
    }

    class TwoFactorAuthentication {

        private _input: Array<string>;
        private _screen: Array<Array<string>>;
        private _screenSize: IScreenObject;

        public constructor(input: Array<string>, cols: number, rows: number) {
            this._input = input;
            this._screen = [];
            this._screenSize = {
                "cols": cols,
                "rows": rows
            };
        }

        public getcode(): string {
            this.addRect(this._screenSize.cols, this._screenSize.rows, ".");
            for (let line of this._input) {
                let instruction: string = line.substr(0, 4);
                let params: Array<string>;
                if (instruction === "rect") {
                    params = /rect ([0-9]*)x([0-9]*)/.exec(line);

                    this.addRect(parseInt(params[1], 10), parseInt(params[2], 10), "#");
                    continue;
                }
                params = /((row) y=|(column) x=)([0-9]*) by ([0-9]*)/.exec(line);
                this.rotate(params[2] || params[3], parseInt(params[4], 10), parseInt(params[5], 10));
            }
            let result: string = "";
            for (let row of this._screen) {
                result += row.join("") + "-";
            }
            return result.slice(0, -1);
        }

        private rotate(dir: string, x: number, by: number): void {
            if (dir === "row") {
                this.rotateRow(x, by);
                return;
            }
            this.rotateCol(x, by);
        }

        private rotateRow(rows: number, by: number): void {
            let tmp: Array<string> = [];
            for (let i: number = 0; i < this._screenSize.cols; i++) {
                tmp[i] = this._screen[rows][i];

                let newValPos: number = i - by;
                if (newValPos < 0) {
                    newValPos += this._screenSize.cols;
                }

                let newVal: string = tmp[newValPos];
                if (!newVal) {
                    newVal = this._screen[rows][newValPos];
                }

                this._screen[rows][i] = newVal;
            }
        }

        private rotateCol(cols: number, by: number): void {
            let tmp: Array<string> = [];
            for (let i: number = 0; i < this._screenSize.rows; i++) {
                tmp[i] = this._screen[i][cols];

                let newValPos: number = i - by;
                if (newValPos < 0) {
                    newValPos += this._screenSize.rows;
                }

                let newVal: string = tmp[newValPos];
                if (!newVal) {
                    newVal = this._screen[newValPos][cols];
                }
                this._screen[i][cols] = newVal;
            }
        }

        private addRect(col: number, row: number, val: string): void {
            for (let i: number = 0; i < row; i++) {
                if (!this._screen[i]) {
                    this._screen[i] = [];
                }
                for (let j: number = 0; j < col; j++) {
                    this._screen[i][j] = val;
                }
            }
        }
    }

    /**
     * TESTS
     */
    interface ITestInputsObject {
        "input": Array<string>;
        "result": string;
    }

    let testInputs: Array<ITestInputsObject> = [
        {
            "input": [
                "rect 3x2",
                "rotate column x=1 by 1"
            ],
            "result": "#.#....-###....-.#....."
        },
        {
            "input": [
                "rect 3x2",
                "rotate column x=1 by 1",
                "rotate row y=0 by 4"
            ],
            "result": "....#.#-###....-.#....."
        },
        {
            "input": [
                "rect 3x2",
                "rotate column x=1 by 1",
                "rotate row y=0 by 4",
                "rotate column x=1 by 1"
            ],
            "result": ".#..#.#-#.#....-.#....."
        },
        {
            "input": [
                "rect 3x3"
            ],
            "result": "###....-###....-###...."
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: TwoFactorAuthentication = new TwoFactorAuthentication(testInput.input, 7, 3);
        let test: string = codeTest.getcode();

        if (test !== testInput.result) {
            throw "Test failed: (" + typeof test + ")" + test +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: Array<string> = [
        "rect 1x1",
        "rotate row y=0 by 20",
        "rect 1x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 3",
        "rect 2x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 3",
        "rect 2x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 4",
        "rect 2x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 3",
        "rect 2x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 5",
        "rect 1x1",
        "rotate row y=0 by 2",
        "rect 1x1",
        "rotate row y=0 by 6",
        "rect 5x1",
        "rotate row y=0 by 2",
        "rect 1x3",
        "rotate row y=2 by 8",
        "rotate row y=0 by 8",
        "rotate column x=0 by 1",
        "rect 7x1",
        "rotate row y=2 by 24",
        "rotate row y=0 by 20",
        "rotate column x=5 by 1",
        "rotate column x=4 by 2",
        "rotate column x=2 by 2",
        "rotate column x=0 by 1",
        "rect 7x1",
        "rotate column x=34 by 2",
        "rotate column x=22 by 1",
        "rotate column x=15 by 1",
        "rotate row y=2 by 18",
        "rotate row y=0 by 12",
        "rotate column x=8 by 2",
        "rotate column x=7 by 1",
        "rotate column x=5 by 2",
        "rotate column x=2 by 1",
        "rotate column x=0 by 1",
        "rect 9x1",
        "rotate row y=3 by 28",
        "rotate row y=1 by 28",
        "rotate row y=0 by 20",
        "rotate column x=18 by 1",
        "rotate column x=15 by 1",
        "rotate column x=14 by 1",
        "rotate column x=13 by 1",
        "rotate column x=12 by 2",
        "rotate column x=10 by 3",
        "rotate column x=8 by 1",
        "rotate column x=7 by 2",
        "rotate column x=6 by 1",
        "rotate column x=5 by 1",
        "rotate column x=3 by 1",
        "rotate column x=2 by 2",
        "rotate column x=0 by 1",
        "rect 19x1",
        "rotate column x=34 by 2",
        "rotate column x=24 by 1",
        "rotate column x=23 by 1",
        "rotate column x=14 by 1",
        "rotate column x=9 by 2",
        "rotate column x=4 by 2",
        "rotate row y=3 by 5",
        "rotate row y=2 by 3",
        "rotate row y=1 by 7",
        "rotate row y=0 by 5",
        "rotate column x=0 by 2",
        "rect 3x2",
        "rotate column x=16 by 2",
        "rotate row y=3 by 27",
        "rotate row y=2 by 5",
        "rotate row y=0 by 20",
        "rotate column x=8 by 2",
        "rotate column x=7 by 1",
        "rotate column x=5 by 1",
        "rotate column x=3 by 3",
        "rotate column x=2 by 1",
        "rotate column x=1 by 2",
        "rotate column x=0 by 1",
        "rect 9x1",
        "rotate row y=4 by 42",
        "rotate row y=3 by 40",
        "rotate row y=1 by 30",
        "rotate row y=0 by 40",
        "rotate column x=37 by 2",
        "rotate column x=36 by 3",
        "rotate column x=35 by 1",
        "rotate column x=33 by 1",
        "rotate column x=32 by 1",
        "rotate column x=31 by 3",
        "rotate column x=30 by 1",
        "rotate column x=28 by 1",
        "rotate column x=27 by 1",
        "rotate column x=25 by 1",
        "rotate column x=23 by 3",
        "rotate column x=22 by 1",
        "rotate column x=21 by 1",
        "rotate column x=20 by 1",
        "rotate column x=18 by 1",
        "rotate column x=17 by 1",
        "rotate column x=16 by 3",
        "rotate column x=15 by 1",
        "rotate column x=13 by 1",
        "rotate column x=12 by 1",
        "rotate column x=11 by 2",
        "rotate column x=10 by 1",
        "rotate column x=8 by 1",
        "rotate column x=7 by 2",
        "rotate column x=5 by 1",
        "rotate column x=3 by 3",
        "rotate column x=2 by 1",
        "rotate column x=1 by 1",
        "rotate column x=0 by 1",
        "rect 39x1",
        "rotate column x=44 by 2",
        "rotate column x=42 by 2",
        "rotate column x=35 by 5",
        "rotate column x=34 by 2",
        "rotate column x=32 by 2",
        "rotate column x=29 by 2",
        "rotate column x=25 by 5",
        "rotate column x=24 by 2",
        "rotate column x=19 by 2",
        "rotate column x=15 by 4",
        "rotate column x=14 by 2",
        "rotate column x=12 by 3",
        "rotate column x=9 by 2",
        "rotate column x=5 by 5",
        "rotate column x=4 by 2",
        "rotate row y=5 by 5",
        "rotate row y=4 by 38",
        "rotate row y=3 by 10",
        "rotate row y=2 by 46",
        "rotate row y=1 by 10",
        "rotate column x=48 by 4",
        "rotate column x=47 by 3",
        "rotate column x=46 by 3",
        "rotate column x=45 by 1",
        "rotate column x=43 by 1",
        "rotate column x=37 by 5",
        "rotate column x=36 by 5",
        "rotate column x=35 by 4",
        "rotate column x=33 by 1",
        "rotate column x=32 by 5",
        "rotate column x=31 by 5",
        "rotate column x=28 by 5",
        "rotate column x=27 by 5",
        "rotate column x=26 by 3",
        "rotate column x=25 by 4",
        "rotate column x=23 by 1",
        "rotate column x=17 by 5",
        "rotate column x=16 by 5",
        "rotate column x=13 by 1",
        "rotate column x=12 by 5",
        "rotate column x=11 by 5",
        "rotate column x=3 by 1",
        "rotate column x=0 by 1"
    ];

    let solution: TwoFactorAuthentication = new TwoFactorAuthentication(input, 50, 6);
    console.log("Lit pixels: \n", solution.getcode().replace(/-/g, "\n"));
}
