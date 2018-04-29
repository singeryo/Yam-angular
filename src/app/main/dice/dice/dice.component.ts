import {Component, Input, OnInit} from '@angular/core';
import {DiceService} from '../dice.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Dice} from '../../../shared/models/dice';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

    @Input() diceCount = 5;
    @Input() diceFaces = 6;

    dices: Dice[] = [];

    _count = Observable.of(this.diceCount);

    constructor(public diceService: DiceService) { }

    ngOnInit() {
        this._count.subscribe(count => this.initDices(count));
    }

    addDice() {
        this.diceCount++;
    }

    initDices(count: number) {
        console.log(count);
    }

}
