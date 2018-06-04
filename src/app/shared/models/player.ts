import {ScoreTable} from './scoreTable';

class PlayerType {
}

export class Player {
    name: string;
    scoreTable: ScoreTable;
    type: PlayerType;

    constructor(name: string) {
        this.name = name;
    }

}
