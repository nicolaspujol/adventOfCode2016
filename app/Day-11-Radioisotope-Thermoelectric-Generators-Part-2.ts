/*
--- Day 11: Radioisotope Thermoelectric Generators ---

You step into the cleanroom separating the lobby from the isolated area and put on the hazmat suit.

Upon entering the isolated containment area, however, you notice some extra parts on the first floor that weren't
listed on the record outside:

    - An elerium generator.
    - An elerium-compatible microchip.
    - A dilithium generator.
    - A dilithium-compatible microchip.

These work just like the other generators and microchips. You'll have to get them up to assembly as well.

What is the minimum number of steps required to bring all of the objects,
including these four new ones, to the fourth floor?
*/

namespace AdventOfCodeDay11Part2 {
    // Interfaces
    interface IStateObject {
        "elevator": number;
        "items": Array<number>;
    }
    interface IQueueObject {
        "head": IHeadObject | INodeObject;
        "tail": INodeObject;
        "length": number;
    }
    interface IHeadObject {
        "value": IQueueValueObject;
        "next"?: INodeObject;
    }
    interface INodeObject {
        "next": INodeObject;
        "value": IQueueValueObject;
    }
    interface IQueueValueObject {
        "prev": INodeObject | IPrevNodeObject;
        "state": IStateObject;
    }
    interface IPrevNodeObject {
        "state": IStateObject;
        "prev": any;
        "next"?: IStateObject;
    }

    // Enums
    enum FLOORS {
        FIRST = 0,
        SECOND = 1,
        THIRD = 2
    }
    enum MICROSHIP_GENERATOR_PAIR {
        GENERATOR = 0,
        MICROSHIP = 1
    }

    class RadioisotopeThermoelectricGenerators {

        private _input: Array<string>;
        private _inputItems: Array<number>;

        public constructor(input: Array<string>) {
            this._input = input;
            this._inputItems = [];
        }

        public getMinimumNumberOfSteps(): number {
            this.parseInput();
            return this.getSteps().length - 1;
        }

        private parseInput(): void {
            let reg: RegExp =
            /(The |floor contains a |microchip| and a |\.|generator|fourth floor contains nothing relevant|, a |,)/g;
            let eltsList: Array<string> = [];
            for (let line of this._input) {
                let lineElts: Array<string> = line.replace(reg, "").trim().split(" ");
                for (let i: number = 1; i < lineElts.length; i++) {
                    let type: MICROSHIP_GENERATOR_PAIR = MICROSHIP_GENERATOR_PAIR.GENERATOR;
                    if (lineElts[i].indexOf("-compatible") !== -1) {
                        type = MICROSHIP_GENERATOR_PAIR.MICROSHIP;
                    }

                    let eltName: string = lineElts[i].replace("-compatible", "");
                    let eltPos: number = eltsList.indexOf(eltName);
                    if (eltPos === -1) {
                        eltPos = eltsList.length;
                        eltsList.push(eltName);
                    }
                    this._inputItems[eltPos * 2 + type] = FLOORS[lineElts[0].toUpperCase()];
                }
            }
        }

        private movedState(
            states: Array<IStateObject>,
            state: IStateObject,
            direction: number,
            itemA: number,
            itemB?: number): IStateObject {
            let nextState: IStateObject = {
                "elevator": 0,
                "items": []
            };
            for (let item in state) {
                nextState[item] = state[item];
            }
            nextState.elevator += direction;
            nextState.items = nextState.items.slice();
            nextState.items[itemA] += direction;
            if (itemB !== undefined) {
                nextState.items[itemB] += direction;
            }
            return nextState;
        }

        private push(queue: IQueueObject, value: IQueueValueObject): void {
            let node: INodeObject = { "next": undefined, "value": value };
            if (queue.head) {
                queue.head.next = node;
            }
            queue.head = node;
            if (!queue.tail) {
                queue.tail = node;
            }
            queue.length++;
        }

        private pop(queue: IQueueObject): IQueueValueObject {
            let node: INodeObject = queue.tail;
            if (node) {
                queue.tail = node.next;
                if (!queue.tail) {
                    queue.head = undefined;
                }
                node.next = undefined;
                queue.length--;
                return node.value;
            }
        }

        private getSteps(): Array<IStateObject> {
            let initialState: IStateObject = {
                "elevator": 0,
                "items": this._inputItems
            };
            let exploredStates: Object = {};

            let queue: IQueueObject = { "head": undefined, "tail": undefined, "length": 0 };
            this.push(queue, { "prev": undefined, "state": initialState });

            let node: IPrevNodeObject = this.pop(queue);
            while (node) {
                let state: IStateObject = node.state;
                if (this.isFinalState(state)) {
                    let steps: Array<IStateObject> = [];
                    while (node) {
                        steps.push(node.state);
                        node = node.prev;
                    }
                    return steps.reverse();
                }
                let nextStates: Array<IStateObject> = this.getNextStates(exploredStates, state);
                for (let nextState of nextStates) {
                    this.push(queue, { "prev": node, "state": nextState });
                }
                node = this.pop(queue);
            }
            throw new Error("No solution found");
        }

        private getNextStates(exploredStates: Object, state: IStateObject): Array<IStateObject> {
            let possibleStates: Array<IStateObject> = this.getNextPossibleStates(state);
            return possibleStates.filter((currState: IStateObject) => {
                let hash: string = this.stateHash(currState);
                if (exploredStates[hash]) {
                    return false;
                }
                exploredStates[hash] = true;
                return this.isValidState(currState);
            });
        }

        private getNextPossibleStates(state: IStateObject): Array<IStateObject> {
            let canMove: Array<number> = [];
            for (let i: number = 0; i < state.items.length; i++) {
                if (state.items[i] === state.elevator) {
                    canMove.push(i);
                }
            }
            let states: Array<IStateObject> = [];
            if (state.elevator !== 3) {
                for (let i: number = 0; i < canMove.length; i++) {
                    for (let j: number = i + 1; j < canMove.length; j++) {
                        states.push(this.movedState(states, state, 1, canMove[i], canMove[j]));
                    }
                    states.push(this.movedState(states, state, 1, canMove[i]));
                }
            }
            if (state.elevator !== 0) {
                for (let i: number = 0; i < canMove.length; i++) {
                    states.push(this.movedState(states, state, -1, canMove[i]));
                    for (let j: number = i + 1; j < canMove.length; j++) {
                        states.push(this.movedState(states, state, -1, canMove[i], canMove[j]));
                    }
                }
            }
            return states;
        }

        private stateHash(state: IStateObject): string {
            let elementPairs: Array<string> = [];
            for (let i: number = 0; i < state.items.length; i += 2) {
                elementPairs.push((state.items[i]).toString() + (state.items[i + 1]).toString());
            }
            return state.elevator + elementPairs.sort().join("");
        }

        private isValidState(state: IStateObject): boolean {
            for (let i: number = 0; i < state.items.length; i += 2) {
                if (state.items[i] !== state.items[i + 1]) {
                    for (let j: number = 0; j < state.items.length; j += 2) {
                        if (state.items[j] === state.items[i + 1]) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        private isFinalState(state: IStateObject): boolean {
            for (let stateItem of state.items) {
                if (stateItem !== 3) {
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
                "The first floor contains a lithium-compatible microchip, a elerium generator, a elerium-compatible " +
                    "microchip, a dilithium generator and a dilithium-compatible microchip.",
                "The second floor contains a hydrogen generator and a hydrogen-compatible microchip.",
                "The third floor contains a lithium generator.",
                "The fourth floor contains nothing relevant."
            ],
            "result": 31
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: RadioisotopeThermoelectricGenerators = new RadioisotopeThermoelectricGenerators(testInput.input);
        let test: number = codeTest.getMinimumNumberOfSteps();

        if (test !== testInput.result) {
            throw "Test failed: (" + typeof test + ")" + test +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: Array<string> = [
        "The first floor contains a promethium generator and a promethium-compatible microchip, " +
            "a elerium generator, a elerium-compatible microchip, a dilithium generator and a " +
            "dilithium-compatible microchip",
        "The second floor contains a cobalt generator, a curium generator, a ruthenium generator, " +
        "and a plutonium generator.",
        "The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, " +
        "a ruthenium-compatible microchip, and a plutonium-compatible microchip.",
        "The fourth floor contains nothing relevant."
    ];

    let solution: RadioisotopeThermoelectricGenerators = new RadioisotopeThermoelectricGenerators(input);
    console.log("Minimum number of steps: ", solution.getMinimumNumberOfSteps());
}
