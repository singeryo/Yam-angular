import {Component, OnInit} from '@angular/core';
import {Player} from '../../shared/models/player';
import {GameService} from '../services/game.service';
import {scores} from '../../shared/config/configs/rules';
import {DiceService} from '../services/dice.service';
import {TurnService} from '../services/turn.service';
import {RulesService} from '../services/rules.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    players: Player[];
    scores = Object.values(scores);

    possibleScoreEntries: any = {};

    constructor(public gameService: GameService, public diceService: DiceService, public turnService: TurnService, public rulesService: RulesService) {
        this.players = [
            new Player('Oliver'),
            new Player('Kem')
        ];
    }

    onThrow() {
        this.possibleScoreEntries = this.rulesService.getScoreValues(this.diceService.values());
        console.log(this.possibleScoreEntries);
    }

    register(score) {
        //let values = this.diceService.values();
        // this.gameService.registerScore(score, value);
    }

    ngOnInit() {
        this.gameService.runGame(this.players);
    }

}
