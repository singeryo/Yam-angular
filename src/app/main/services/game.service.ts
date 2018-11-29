import {Injectable} from '@angular/core';
import {Player} from '../../shared/models/player';
import {TurnService} from './turn.service';

@Injectable()
export class GameService {


    currentPlayer: Player;

    constructor(public turnService: TurnService) {
    }

    gameComplete() {
        return false;
    }

    /**
     * @param {Player} player
     * @return {boolean}
     */
    isCurrentPlayer(player: Player) {
        return player.name === this.currentPlayer.name;
    }


    /**
     *
     * @param {Player[]} players
     */
    runGame(players: Player[]) {
        let i = 0;
        this.turnService.turnEnd.subscribe(
            (registeredValue) => {
                if (!registeredValue) {
                    // Game just started
                    this.currentPlayer = players[0];
                } else if (this.gameComplete()) {
                    // game completed
                } else {
                    i = (i < players.length - 1) ? ++i : 0;
                    // Register score and pass turn to next player
                    this.currentPlayer.register(registeredValue.score, registeredValue.value);
                    this.currentPlayer = players[i];
                }
            }
        )

    }

}
