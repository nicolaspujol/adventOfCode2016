/*
--- Day 11: Radioisotope Thermoelectric Generators ---

You come upon a column of four floors that have been entirely sealed off from the rest of the building except
for a small dedicated lobby.
There are some radiation warnings and a big sign which reads "Radioisotope Testing Facility".

According to the project status board, this facility is currently being used to experiment with
Radioisotope Thermoelectric Generators (RTGs, or simply "generators") that are designed to be paired with
specially-constructed microchips.
Basically, an RTG is a highly radioactive rock that generates electricity through heat.

The experimental RTGs have poor radiation containment, so they're dangerously radioactive.
The chips are prototypes and don't have normal radiation shielding,
but they do have the ability to generate an electromagnetic radiation shield when powered.
Unfortunately, they can only be powered by their corresponding RTG.
An RTG powering a microchip is still dangerous to other microchips.

In other words, if a chip is ever left in the same area as another RTG,
and it's not connected to its own RTG, the chip will be fried.
Therefore, it is assumed that you will follow procedure and keep chips connected to their corresponding RTG
when they're in the same room, and away from other RTGs otherwise.

These microchips sound very interesting and useful to your current activities,
and you'd like to try to retrieve them.
The fourth floor of the facility has an assembling machine which can make a self-contained,
shielded computer for you to take with you - that is, if you can bring it all of the RTGs and microchips.

Within the radiation-shielded part of the facility (in which it's safe to have these pre-assembly RTGs),
there is an elevator that can move between the four floors.
Its capacity rating means it can carry at most yourself and two RTGs or microchips in any combination.
(They're rigged to some heavy diagnostic equipment - the assembling machine will detach it for you.)
As a security measure, the elevator will only function if it contains at least one RTG or microchip.
The elevator always stops on each floor to recharge, and this takes long enough that the items within it
and the items on that floor can irradiate each other.
(You can prevent this if a Microchip and its Generator end up on the same floor in this way,
as they can be connected while the elevator is recharging.)

You make some notes of the locations of each component of interest (your puzzle input).
Before you don a hazmat suit and start moving things around, you'd like to have an idea of what you need to do.

When you enter the containment area, you and the elevator will start on the first floor.

For example, suppose the isolated area has the following arrangement:

The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.

As a diagram (F# for a Floor number, E for Elevator, H for Hydrogen, L for Lithium, M for Microchip,
and G for Generator), the initial state looks like this:

F4 .  .  .  .  .  
F3 .  .  .  LG .  
F2 .  HG .  .  .  
F1 E  .  HM .  LM 

Then, to get everything up to the assembling machine on the fourth floor, the following steps could be taken:

    - Bring the Hydrogen-compatible Microchip to the second floor,
        which is safe because it can get power from the Hydrogen Generator:

    F4 .  .  .  .  .  
    F3 .  .  .  LG .  
    F2 E  HG HM .  .  
    F1 .  .  .  .  LM 

    - Bring both Hydrogen-related items to the third floor,
        which is safe because the Hydrogen-compatible microchip is getting power from its generator:

    F4 .  .  .  .  .  
    F3 E  HG HM LG .  
    F2 .  .  .  .  .  
    F1 .  .  .  .  LM 

    - Leave the Hydrogen Generator on floor three,
        but bring the Hydrogen-compatible Microchip back down with you so you can still use the elevator:

    F4 .  .  .  .  .  
    F3 .  HG .  LG .  
    F2 E  .  HM .  .  
    F1 .  .  .  .  LM 

    - At the first floor, grab the Lithium-compatible Microchip,
        which is safe because Microchips don't affect each other:

    F4 .  .  .  .  .  
    F3 .  HG .  LG .  
    F2 .  .  .  .  .  
    F1 E  .  HM .  LM 

    - Bring both Microchips up one floor, where there is nothing to fry them:

    F4 .  .  .  .  .  
    F3 .  HG .  LG .  
    F2 E  .  HM .  LM 
    F1 .  .  .  .  .  

    - Bring both Microchips up again to floor three,
        where they can be temporarily connected to their corresponding generators while the elevator recharges,
        preventing either of them from being fried:

    F4 .  .  .  .  .  
    F3 E  HG HM LG LM 
    F2 .  .  .  .  .  
    F1 .  .  .  .  .  

    - Bring both Microchips to the fourth floor:

    F4 E  .  HM .  LM 
    F3 .  HG .  LG .  
    F2 .  .  .  .  .  
    F1 .  .  .  .  .  

    - Leave the Lithium-compatible microchip on the fourth floor,
        but bring the Hydrogen-compatible one so you can still use the elevator;
        this is safe because although the Lithium Generator is on the destination floor,
        you can connect Hydrogen-compatible microchip to the Hydrogen Generator there:

    F4 .  .  .  .  LM 
    F3 E  HG HM LG .  
    F2 .  .  .  .  .  
    F1 .  .  .  .  .  

    - Bring both Generators up to the fourth floor,
        which is safe because you can connect the Lithium-compatible Microchip to the Lithium Generator upon arrival:

    F4 E  HG .  LG LM 
    F3 .  .  HM .  .  
    F2 .  .  .  .  .  
    F1 .  .  .  .  .  

    - Bring the Lithium Microchip with you to the third floor so you can use the elevator:

    F4 .  HG .  LG .  
    F3 E  .  HM .  LM 
    F2 .  .  .  .  .  
    F1 .  .  .  .  .  

    - Bring both Microchips to the fourth floor:

    F4 E  HG HM LG LM 
    F3 .  .  .  .  .  
    F2 .  .  .  .  .  
    F1 .  .  .  .  .  

In this arrangement, it takes 11 steps to collect all of the objects at the fourth floor for assembly.
(Each elevator stop counts as one step, even if nothing is added to or removed from it.)

In your situation, what is the minimum number of steps required to bring all of the objects to the fourth floor?
*/

namespace AdventOfCodeDay11Part1 {
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
                "The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.",
                "The second floor contains a hydrogen generator.",
                "The third floor contains a lithium generator.",
                "The fourth floor contains nothing relevant."
            ],
            "result": 11
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
        "The first floor contains a promethium generator and a promethium-compatible microchip.",
        "The second floor contains a cobalt generator, a curium generator, a ruthenium generator, " +
        "and a plutonium generator.",
        "The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, " +
        "a ruthenium-compatible microchip, and a plutonium-compatible microchip.",
        "The fourth floor contains nothing relevant."
    ];

    let solution: RadioisotopeThermoelectricGenerators = new RadioisotopeThermoelectricGenerators(input);
    console.log("Minimum number of steps: ", solution.getMinimumNumberOfSteps());
}
