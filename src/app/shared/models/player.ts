import {scores} from '../config/configs/rules';

class PlayerType {
}

export class Player {
    name: string;
    scoreTable: any = {};
    type: PlayerType;

    constructor(name: string) {
        this.name = name;
        this.initScores();
    }

    register(score, value) {
        this.scoreTable[score].val = value;
        this.scoreTable[score].filled = true;
    }

    startTurn() {

    }

    initScores() {
        // Init score values based on score file config
        Object.values(scores).forEach((value) => {
            Object.defineProperty(this.scoreTable, value, {
                value: {val: 0, filled: false},
                writable: true
            })
        })
    }

}
