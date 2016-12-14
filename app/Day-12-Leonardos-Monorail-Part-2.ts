/*
--- Day 12: Leonardo's Monorail ---

As you head down the fire escape to the monorail, you notice it didn't start;
register c needs to be initialized to the position of the ignition key.

If you instead initialize register c to be 1, what value is now left in register a?
*/

namespace AdventOfCodeDay12Part2 {
    // Interfaces
    interface IRegistersObject {
        "a": number;
        "b": number;
        "c": number;
        "d": number;
    }

    class LeonardosMonorail {

        private _input: Array<string>;
        private _registers: IRegistersObject;

        public constructor(input: Array<string>) {
            this._input = input;
            this._registers = {
                "a": 0,
                "b": 0,
                "c": 1,
                "d": 0
            };
        }

        public getValueLeftInRegisterA(): number {
            this.readInstructions();
            return this._registers.a;
        }

        private readInstructions(): void {
            for (let i: number = 0; i < this._input.length; i++) {
                let instruction: string = this._input[i].slice(0, 3);
                let params: Array<string> = this._input[i].slice(4).split(" ");
                switch (instruction) {
                    case "cpy":
                        this._registers[params[1]] = this.value(params[0]);
                        break;
                    case "inc":
                        this._registers[params[0]] += 1;
                        break;
                    case "dec":
                        this._registers[params[0]] -= 1;
                        break;
                    case "jnz":
                        i += (this.value(params[0]) === 0 ? 1 : parseInt(params[1], 10)) - 1;
                        break;
                }
            }
        }

        private value(ptr: string): number {
            return isNaN(parseInt(ptr, 10)) ? this._registers[ptr] : parseInt(ptr, 10);
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
                "cpy 41 a",
                "inc a",
                "inc a",
                "dec a",
                "jnz a 2",
                "dec a"
            ],
            "result": 42
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: LeonardosMonorail = new LeonardosMonorail(testInput.input);
        let test: number = codeTest.getValueLeftInRegisterA();

        if (test !== testInput.result) {
            throw "Test failed: (" + typeof test + ")" + test +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: Array<string> = [
        "cpy 1 a",
        "cpy 1 b",
        "cpy 26 d",
        "jnz c 2",
        "jnz 1 5",
        "cpy 7 c",
        "inc d",
        "dec c",
        "jnz c -2",
        "cpy a c",
        "inc a",
        "dec b",
        "jnz b -2",
        "cpy c b",
        "dec d",
        "jnz d -6",
        "cpy 14 c",
        "cpy 14 d",
        "inc a",
        "dec d",
        "jnz d -2",
        "dec c",
        "jnz c -5"
    ];

    let solution: LeonardosMonorail = new LeonardosMonorail(input);
    console.log("Value left in register a: ", solution.getValueLeftInRegisterA());
}
