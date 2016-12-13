/*
--- Day 2: Bathroom Security ---

You arrive at Easter Bunny Headquarters under cover of darkness.
However, you left in such a rush that you forgot to use the bathroom! Fancy office buildings like this one 
usually have keypad locks on their bathrooms, so you search the front desk for the code.

"In order to improve security," the document you find says, "bathroom codes will no longer be written down.
Instead, please memorize and follow the procedure below to access the bathrooms."

The document goes on to explain that each button to be pressed can be found by starting on the previous 
button and moving to adjacent buttons on the keypad: U moves up, D moves down, L moves left, and R moves right.
Each line of instructions corresponds to one button, starting at the previous button
(or, for the first line, the "5" button); press whatever button you're on at the end of each line.
If a move doesn't lead to a button, ignore it.

You can't hold it much longer, so you decide to figure out the code as you walk to the bathroom.
You picture a keypad like this:

1 2 3
4 5 6
7 8 9

Suppose your instructions are:

ULL
RRDDD
LURDL
UUUUD

    You start at "5" and move up (to "2"), left (to "1"), and left (you can't, and stay on "1"),
    so the first button is 1.
    Starting from the previous button ("1"), you move right twice (to "3") and then down three times
    (stopping at "9" after two moves and ignoring the third), ending up with 9.
    Continuing from "9", you move left, up, right, down, and left, ending with 8.
    Finally, you move up four times (stopping at "2"), then down once, ending with 5.

So, in this example, the bathroom code is 1985.

Your puzzle input is the instructions from the document you found at the front desk. What is the bathroom code?
*/

namespace AdventOfCodeDay2Part1 {
    // Interfaces
    interface IDirectionObject {
        "DOWN": string;
        "LEFT": string;
        "RIGHT": string;
        "UP": string;
    }
    interface IKeypadObject {
        "0": Array<number>;
        "1": Array<number>;
        "2": Array<number>;
    }

    class BathroomSecurity {

        // Constants
        private readonly DIRECTION: IDirectionObject = {
            "DOWN": "D",
            "LEFT": "L",
            "RIGHT": "R",
            "UP": "U"
        };

        private readonly KEYPAD: IKeypadObject = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        private _input: Array<string>;
        private _currPos: Array<number>;

        public constructor(input: Array<string>) {
            this._input = input;
            this._currPos = [1, 1];
        };

        public getCode(): string {
            let buttonPresses: Array<number> = [];

            for (let line of this._input) {
                for (let instruction of line) {
                    this._currPos = this.getNextNumber(instruction);
                }

                buttonPresses.push(this.getDigit(this._currPos));
            }

            return buttonPresses.join("");
        }

        private getDigit(position: Array<number>): number {
            return this.KEYPAD[position[0]][position[1]];
        }

        private getNextNumber(instruction: string): Array<number> {
            let newPosition: Array<number> = [ this._currPos[0], this._currPos[1] ];

            switch (instruction) {
                case this.DIRECTION.UP: newPosition[0] = newPosition[0] - 1; break;
                case this.DIRECTION.DOWN: newPosition[0] = newPosition[0] + 1; break;
                case this.DIRECTION.LEFT: newPosition[1] = newPosition[1] - 1; break;
                case this.DIRECTION.RIGHT: newPosition[1] = newPosition[1] + 1; break;
            }
            if (this.isValidDigit(newPosition)) {
                return newPosition;
            }
            return this._currPos;
        }

        private isValidDigit(newPosition: Array<number>): boolean {
            return !((newPosition[0] < 0 || newPosition[1] < 0) ||
                (newPosition[0] >= this.KEYPAD[0].length) ||
                (newPosition[1] >= this.KEYPAD[1].length));
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
                "ULL",
                "RRDDD",
                "LURDL",
                "UUUUD"
            ],
            "result": "1985"
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: BathroomSecurity = new BathroomSecurity(testInput.input);
        let codeGet: string = codeTest.getCode();

        if (codeGet !== testInput.result) {
            throw "Test failed: (" + typeof codeGet + ")" + codeGet +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: Array<string> = [
            "DLRURUDLULRDRUDDRLUUUDLDLDLRLRRDRRRLLLLLDDRRRDRRDRRRLRRURLRDUULRLRRDDLULRLLDUDLULURRLRLDUDLURURLDRDDULD" +
            "RDRDLDLLULULLDDLRRUDULLUULRRLLLURDRLDDLDDLDRLRRLLRURRUURRRRLUDLRDDDDRDULRLLDDUURDUDRLUDULLUDLUDURRDRDUU" +
            "UUDDUDLLLRLUULRUURDLRLLRRLRLLDLLRLLRRRURLRRLURRLDLLLUUDURUDDLLUURRDRDRRDLLDDLLRDRDRRLURLDLDRDLURLDULDRU" +
            "RRRUDLLULDUDRURULDUDLULULRRRUDLUURRDURRURRLRRLLRDDUUUUUDUULDRLDLLRRUDRRDULLLDUDDUDUURLRDLULUUDLDRDUUUDD" +
            "DUDLDURRULUULUUULDRUDDLLLDLULLRLRLUDULLDLLRLDLDDDUUDURDDDLURDRRDDLDRLLRLRR",
            "RLDUDURDRLLLLDDRRRURLLLRUUDDLRDRDDDUDLLUDDLRDURLDRDLLDRULDDRLDDDRLDRDDDRLLULDURRRLULDRLRDRDURURRDUDRURL" +
            "DRLURDRLUULLULLDLUDUDRDRDDLDDDDRDURDLUDRDRURUDDLLLRLDDRURLLUDULULDDLLLDLUDLDULUUDLRLURLDRLURURRDUUDLRDD" +
            "DDDRLDULUDLDDURDLURLUURDLURLDRURRLDLLRRUDRUULLRLDUUDURRLDURRLRUULDDLDLDUUDDRLDLLRRRUURLLUURURRURRLLLUDL" +
            "DRRDLUULULUDDULLUDRLDDRURDRDUDULUDRLRRRUULLDRDRLULLLDURURURLURDLRRLLLDRLDUDLLLLDUUURULDDLDLLRRUDDDURULR" +
            "LLUDLRDLUUDDRDDLLLRLUURLDLRUURDURDDDLLLLLULRRRURRDLUDLUURRDRLRUDUUUURRURLRDRRLRDRDULLDRDRLDURDDUURLRUDD" +
            "DDDLRLLRUDDDDDURURRLDRRUUUDLURUUDRRDLLULDRRLRRRLUUUD",
            "RDRURLLUUDURURDUUULLRDRLRRLRUDDUDRURLLDLUUDLRLLDDURRURLUDUDDURLURLRRURLLURRUDRUDLDRLLURLRUUURRUDDDURRRL" +
            "ULLLLURDLRLLDDRLDRLLRRDLURDLRDLDUDRUULLDUUUDLURRLLRUDDDUUURLURUUDRLRULUURLLRLUDDLLDURULLLDURDLULDLDDUDU" +
            "LUDDULLRDRURDRRLLDLDDDDRUDLDRRLLLRLLLRRULDLRLRLRLLDLRDRDLLUDRDRULDUURRDDDRLLRLDLDRDUDRULUDRDLDLDDLLRULU" +
            "RLLURDLRRDUDLULLDLULLUDRRDDRLRURRLDUDLRRUUDLDRLRLDRLRRDURRDRRDDULURUUDDUUULRLDRLLDURRDLUULLUDRDDDLRUDLR" +
            "ULLDDDLURLURLRDRLLURRRUDLRRLURDUUDRLRUUDUULLRUUUDUUDDUURULDLDLURLRURLRUDLULLULRULDRDRLLLRRDLU",
            "RRRRDRLUUULLLRLDDLULRUUURRDRDRURRUURUDUULRULULRDRLRRLURDRRRULUUULRRUUULULRDDLLUURRLLDUDRLRRLDDLDLLDURLL" +
            "UDLDDRRURLDLULRDUULDRLRDLLDLRULLRULLUDUDUDDUULDLUUDDLUDDUULLLLLURRDRULURDUUUDULRUDLLRUUULLUULLLRUUDDRRL" +
            "RDUDDRULRDLDLLLLRLDDRRRULULLLDLRLURRDULRDRDUDDRLRLDRRDLRRRLLDLLDULLUDDUDDRULLLUDDRLLRRRLDRRURUUURRDLDLU" +
            "RRDLURULULRDUURLLULDULDUDLLULDDUURRRLDURDLUDURLDDRDUDDLLUULDRRLDLLUDRDURLLDRLDDUDURDLUUUUURRUULULLURLDU" +
            "UULLRURLLLUURDULLUULDRULLUULRDRUULLRUDLDDLRLURRUUDRLRRRULRUUULRULRRLDLUDRRLL",
            "ULRLDLLURDRRUULRDUDDURDDDLRRRURLDRUDDLUDDDLLLRDLRLLRRUUDRRDRUULLLULULUUDRRRDRDRUUUUULRURUULULLULDULURRL" +
            "URUDRDRUDRURURUDLDURUDUDDDRLRLLLLURULUDLRLDDLRUDDUUDURUULRLLLDDLLLLRRRDDLRLUDDUULRRLLRDUDLLDLRRUUULRLRD" +
            "LRDUDLLLDLRULDRURDLLULLLRRRURDLLUURUDDURLDUUDLLDDRUUDULDRDRDRDDUDURLRRRRUDURLRRUDUDUURDRDULRLRLLRLUDLUR" +
            "UDRUDLULLULRLLULRUDDURUURDLRUULDURDRRRLLLLLUUUULUULDLDULLRURLUDLDRLRLRLRDLDRUDULDDRRDURDDULRULDRLRULDRL" +
            "DLLUDLDRLRLRUDRDDR"
        ];

    let blocksAway: BathroomSecurity = new BathroomSecurity(input);

    console.log("Bathroom Code: ", blocksAway.getCode());

}
