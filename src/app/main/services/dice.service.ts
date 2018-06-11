import {Injectable} from '@angular/core';
import {RulesService} from './rules.service';

@Injectable()
export class DiceService {

    currentDiceValues: number[] = [1, 1, 1, 1, 1];

    constructor(public rulesService: RulesService) {

    }

}
