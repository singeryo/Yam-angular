import {Component, OnInit} from '@angular/core';
import {Player} from '../../shared/models/player';
import {GameService} from '../services/game.service';
import {scores} from '../../shared/config/configs/rules';
import {RulesService} from '../services/rules.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    players: Player[];
    scores = Object.values(scores);

    constructor(public gameService: GameService, public rulesService: RulesService) {
        this.players = [
            new Player('Oliver'),
            new Player('Kem')
        ];
    }

    register(score, value) {
        this.gameService.registerScore(score, value);
    }

    ngOnInit() {
        this.gameService.runGame(this.players);
    }

}
