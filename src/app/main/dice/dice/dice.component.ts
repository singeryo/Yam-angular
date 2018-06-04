import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DiceService} from '../dice.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Dice} from '../../../shared/models/dice';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements AfterViewInit {

    @Input() initialDiceCount = 5;
    diceCount = 0;
    @Input() diceFaces = 6;

    dices: Dice[] = [];


    constructor(public diceService: DiceService) { }

    ngAfterViewInit() {
        this.initDices(this.diceCount);
    }

    addDice() {
        this.diceCount++;
        this.dices.push(new Dice());
    }

    initDices(count: number) {
        for (let i = 0; i < this.initialDiceCount; i = i + 1) {
            this.addDice();
        }
    }

}
