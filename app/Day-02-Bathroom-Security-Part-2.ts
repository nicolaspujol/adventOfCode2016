/*
--- Day 2: Bathroom Security ---

You finally arrive at the bathroom (it's a several minute walk from the lobby so visitors can behold the many fancy 
conference rooms and water coolers on this floor) and go to punch in the code. Much to your bladder's dismay,
the keypad is not at all like you imagined it.
Instead, you are confronted with the result of hundreds of man-hours of bathroom-keypad-design meetings:

    1
  2 3 4
5 6 7 8 9
  A B C
    D

You still start at "5" and stop when you're at an edge, but given the same instructions as above,
the outcome is very different:

    You start at "5" and don't move at all (up and left are both edges), ending at 5.
    Continuing from "5", you move right twice and down three times (through "6", "7", "B", "D", "D"), ending at D.
    Then, from "D", you move five more times (through "D", "B", "C", "C", "B"), ending at B.
    Finally, after five more moves, you end at 3.

So, given the actual keypad layout, the code would be 5DB3.

Using the same instructions in your puzzle input, what is the correct bathroom code?
*/

namespace AdventOfCodeDay2Part2 {
    // Interfaces
    interface IDirectionObject {
        "DOWN": string;
        "LEFT": string;
        "RIGHT": string;
        "UP": string;
    }
    interface IKeypadObject {
        "0": Array<string>;
        "1": Array<string>;
        "2": Array<string>;
        "3": Array<string>;
        "4": Array<string>;
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
            ["", "", "1", "", ""],
            ["", "2", "3", "4", ""],
            ["5", "6", "7", "8", "9"],
            ["", "A", "B", "C", ""],
            ["", "", "D", "", ""]
        ];

        private _input: Array<string>;
        private _currPos: Array<number>;

        public constructor(input: Array<string>) {
            this._input = input;
            this._currPos = [2, 0];
        };

        public getCode(): string {
            let buttonPresses: Array<string> = [];

            for (let line of this._input) {
                for (let instruction of line) {
                    this._currPos = this.getNextNumber(instruction);
                }

                buttonPresses.push(this.getDigit(this._currPos));
            }

            return buttonPresses.join("");
        }

        private getDigit(position: Array<number>): string {
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
                (newPosition[1] >= this.KEYPAD[1].length) ||
                (this.getDigit(newPosition).length === 0));
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
            "result": "5DB3"
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
