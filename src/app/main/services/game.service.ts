import {Injectable} from '@angular/core';
import {Player} from '../../shared/models/player';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GameService {


    gameProcessSource = new BehaviorSubject<{score: string, value: number}>(null);
    gameProgress = this.gameProcessSource.asObservable();

    currentPlayer: Player;

    constructor() {
    }

    gameComplete() {
        return false;
    }

    registerScore(score, value) {
        this.gameProcessSource.next({score: score, value: value});
    }

    runGame(players: Player[]) {
        let i = 0;
        this.gameProgress.subscribe(
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
