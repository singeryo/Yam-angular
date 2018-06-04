import {Component, OnInit} from '@angular/core';
import {Player} from '../../shared/models/player';
import {GameService} from '../services/game.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    players: Player[];
    gameService: GameService;

    constructor(gameService: GameService) {
        this.players = [
            new Player('Oliver'),
            new Player('Kem')
        ];
        this.gameService = gameService;
    }

    ngOnInit() {
        this.gameService.runGame(this.players);
    }

}
