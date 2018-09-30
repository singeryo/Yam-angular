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

    /**
     * @param {GameService} gameService
     * @param {DiceService} diceService
     * @param {TurnService} turnService
     * @param {RulesService} rulesService
     */
    constructor(public gameService: GameService, public diceService: DiceService, public turnService: TurnService, public rulesService: RulesService) {
        this.players = [
            new Player('Oliver'),
            new Player('Kem')
        ];
    }

    /**
     * @param score
     * @param player
     *
     * Define here if you should be able to interact with score
     */
    shouldBeDisabled(score, player: Player) {
        // Is disabled if it is not players turn or score is already filled
        return (!this.gameService.isCurrentPlayer(player) || player.scoreTable[score].filled);
    }

    /**
     * @param score
     * @param player
     *
     * What value should be displayed on score entry ?
     */
    toBeDisplayed(score, player: Player) {
        if (player.scoreTable[score].filled) {
            return player.scoreTable[score].val;
        }

        /**
         * Three possible outcomes for returning empty string:
         *  1: Not players turn
         *  2: Dice haven't been thrown once this turn
         *  3: Score not available for this dice throw
         */
        if (!this.gameService.isCurrentPlayer(player) || !this.turnService.turnStarted() || !this.possibleScoreEntries[score]) {
            return '';
        }

        return this.possibleScoreEntries[score];
    }

    /**
     * What happens on dice throw
     */
    onThrow() {
        this.possibleScoreEntries = this.rulesService.getScoreValues(this.diceService.values());
        this.turnService.throwDice();
    }

    /**
     * @param score
     *
     * What to do when registering score
     */
    register(score) {
        //let values = this.diceService.values();
        // this.gameService.registerScore(score, value);
    }

    ngOnInit() {
        this.gameService.runGame(this.players);
    }

}
