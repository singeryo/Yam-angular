import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import 'rxjs/add/observable/of';
import {Die} from '../../../shared/models/dice';
import {DiceService} from '../../services/dice.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements AfterViewInit {

    @Input() initialDiceCount = 5;
    diceCount = 0;
    @Input() diceFaces = 6;
    @Output() throw = new EventEmitter();

    dice: Die[] = [];


    constructor(public diceService: DiceService) { }

    ngAfterViewInit() {
        this.initDices();
    }

    addDice() {
        this.diceCount++;
        this.dice.push(new Die(this.diceFaces));
    }

    initDices() {
        for (let i = 0; i < this.initialDiceCount; i = i + 1) {
            this.addDice();
        }
    }

    throwAllDice() {
        this.throwDice(this.dice);
        this.throw.emit(true);
    }

    throwDice(dice: Die[]) {
        dice.forEach((die) => die.throw());
        this.diceService.push(dice.map(item => item.value()));
    }

}
