import {Injectable} from '@angular/core';
import {DiceService} from './dice.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TurnService {

    turnEndSource = new BehaviorSubject<{score: string, value: number}>(null);
    turnEnd = this.turnEndSource.asObservable();


    constructor(diceService: DiceService) {
    }

    registerScore(score, value) {
        this.turnEndSource.next({score: score, value: value});
    }


}
