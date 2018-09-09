import {Injectable} from '@angular/core';
import {RulesService} from './rules.service';

@Injectable()
export class DiceService {

    currentDiceValues: number[] = [1, 1, 1, 1, 1];

    constructor(public rulesService: RulesService) {

    }

    push(dice: number[]) {
        this.currentDiceValues = dice;
    }

    values() {
        return this.currentDiceValues;
    }

}
