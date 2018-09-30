import {Injectable} from '@angular/core';
import {DiceService} from './dice.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TurnService {

    throwCount = 0;

    turnEndSource = new BehaviorSubject<{score: string, value: number}>(null);
    turnEnd = this.turnEndSource.asObservable();


    constructor() {
    }

    /**
     * Take a dice throw into account
     */
    throwDice() {
        if (this.throwCount === 3) {
            throw new Error('TurnService: Cannot throw dice more than 3 times.')
        }
        this.throwCount++;
    }

    /**
     * @return {boolean}
     *
     * Check if dice can be thrown
     */
    canThrowDice() {
        return this.throwCount < 3;
    }

    /**
     * Turn ended: Reinitialise dice throw count
     */
    reinitThrowCount() {
        this.throwCount = 0;
    }

    turnStarted() {
        return this.throwCount > 0;
    }

    /**
     * @param score
     * @param value
     *
     * Register score and end turn
     */
    registerScore(score, value) {
        this.turnEndSource.next({score: score, value: value});
        this.reinitThrowCount()
    }


}
