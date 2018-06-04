import {Player} from './player';

export class Game {
    players: Player[];
    creationDate: Date;

    constructor(players: Player[]) {
        this.players = players;
    }
}
