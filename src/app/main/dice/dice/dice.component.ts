import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import 'rxjs/add/observable/of';
import {Die} from '../../../shared/models/dice';
import {DiceService} from '../../services/dice.service';
import {TurnService} from '../../services/turn.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements AfterViewInit {

    @Input() initialDiceCount = 5;
    diceCount = 0;
    @Input() diceFaces = 6;
    @Output() throw = new EventEmitter();

    dice: Die[] = [];


    constructor(public diceService: DiceService, public turnService: TurnService) { }

    ngAfterViewInit() {
        this.initDices();
        this.turnService.turnEndSource.subscribe((val) => {
            if (val) {
                this.reInitDice();
            }
        })
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

    toggleSelected(die: Die) {
        if (this.turnService.turnStarted() && this.turnService.canThrowDice()) {
            die.toggleSelected();
        }
    }

    reInitDice() {
        this.dice.forEach(die => {
            die.toggleSelected(false);
            die.reset();
        })
    }

    throwDice(dice: Die[]) {
        dice.forEach((die) => {
            if (!die.selected) {
                die.throw()
            }
        });
        this.diceService.push(dice.map(item => item.value()));
    }

}
