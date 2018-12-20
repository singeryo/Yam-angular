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
    styleUrls: ['./game.component.scss']
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
            new Player('Stan'),
            new Player('Satan')
        ];
    }

    /**
     * @param score
     * @param player
     *
     * Define here if you should be able to interact with score
     */
    shouldBeDisabled(score, player: Player) {
        // Is disabled if it is not players turn, score is already filled or score is calculated
        return (
            !this.gameService.isCurrentPlayer(player)
            || player.scoreTable[score].filled
            || !this.turnService.turnStarted()
            || this.rulesService.isCalculated(score)
        );
    }

    /**
     * @param score
     * @param player
     *
     * What value should be displayed on score entry ?
     * Either players entered score or calculated entry or empty string
     */
    toBeDisplayed(score, player: Player) {
        if (player.scoreTable[score].filled) {
            return player.scoreTable[score].val;
        }

        if (this.rulesService.isCalculated(score)) {
            return this.rulesService.calculatedValues[score](player.scoreTable);
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
     * @param value
     * @param player
     */
    register(score, value, player: Player) {
        if (!this.shouldBeDisabled(score, player)) {
            this.turnService.registerScore(score, value);
        }
    }

    ngOnInit() {
        this.gameService.runGame(this.players);
    }

}
