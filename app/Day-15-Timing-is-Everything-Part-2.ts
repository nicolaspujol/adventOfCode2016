/*
--- Day 15: Timing is Everything ---

After getting the first capsule (it contained a star! what great fortune!),
the machine detects your success and begins to rearrange itself.

When it's done, the discs are back in their original configuration as if it were time=0 again,
but a new disc with 11 positions and starting at position 0 has appeared exactly one second
below the previously-bottom disc.

With this new disc, and counting again starting from time=0 with the configuration in your puzzle input,
what is the first time you can press the button to get another capsule?
*/

namespace AdventOfCodeDay15Part2 {
    // Interfaces
    interface ILinesObject {
        "disc": number;
        "nbPos": number;
        "time": number;
        "pos": number;
    };

    class TimingIsEverything {

        private _input: Array<string>;
        private _lines: Array<ILinesObject>;

        public constructor(input: Array<string>) {
            this._input = input;
            this._lines = [];
        }

        public getFirstTime(): number {
            this.parseLine();
            return this.switchPositions();
        }

        private parseLine(): void {
            for (let line of this._input) {
                let match: Array<string> = /Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)/
                    .exec(line);
                this._lines.push({
                    "disc": parseInt(match[1], 10),
                    "nbPos": parseInt(match[2], 10),
                    "pos": parseInt(match[4], 10),
                    "time": parseInt(match[3], 10)
                });
            }
        }

        private switchPositions(): number {
            let time: number = 0;
            while (!this.areDiscsAligned(time)) {
                time++;
            }
            return time;
        }

        private areDiscsAligned(time: number): boolean {
            for (let line of this._lines) {
                if ((line.pos + time + line.disc) % line.nbPos !== 0) {
                    return false;
                }
            }
            return true;
        }
    }

    /**
     * TESTS
     */
    interface ITestInputsObject {
        "input": Array<string>;
        "result": number;
    }

    let testInputs: Array<ITestInputsObject> = [
        {
            "input": [
                "Disc #1 has 5 positions; at time=0, it is at position 4.",
                "Disc #2 has 2 positions; at time=0, it is at position 1.",
                "Disc #3 has 11 positions; at time=0, it is at position 0."
            ],
            "result": 85
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: TimingIsEverything = new TimingIsEverything(testInput.input);
        let test: number = codeTest.getFirstTime();

        if (test !== testInput.result) {
            throw "Test failed: (" + typeof test + ")" + test +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: Array<string> = [
        "Disc #1 has 5 positions; at time=0, it is at position 2.",
        "Disc #2 has 13 positions; at time=0, it is at position 7.",
        "Disc #3 has 17 positions; at time=0, it is at position 10.",
        "Disc #4 has 3 positions; at time=0, it is at position 2.",
        "Disc #5 has 19 positions; at time=0, it is at position 9.",
        "Disc #6 has 7 positions; at time=0, it is at position 0.",
        "Disc #7 has 11 positions; at time=0, it is at position 0."
    ];

    let solution: TimingIsEverything = new TimingIsEverything(input);
    console.log("First time you can press the button: ", solution.getFirstTime());
}
