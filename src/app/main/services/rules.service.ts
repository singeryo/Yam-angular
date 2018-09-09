import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {points, scores} from '@app-config/config';

/**
 * Service meant to inject Yam rules to components
 */
@Injectable()
export class RulesService {

    /**
     *
     * @param acc: Object
     * @param val: number
     * @returns {any}
     *
     * Meant to be used with Array.reduce(),
     * returns object containing occurrences of array items
     *
     * Need to feed second reduce argument with {} or function will skip first iteration
     */
    occurrencesReducer = (acc, val) => {
        if (isNullOrUndefined(acc[val])) {
            acc[val] = 0;
        }
        acc[val]++;
        return acc;
    };

    /**
     *
     * @param {number[]} array
     * @returns {Object}
     *
     * Returns object containing occurrences of array items ex: {1: 2, 5: 1, 6: 2}
     */
    occurrences = (array: number[]) => array.reduce(this.occurrencesReducer, {});


    /**
     *
     * @param {number[]} array
     * @returns {Array}
     *
     * Returns array of occurrences. Better for array manipulation
     */
    occurrenceValues = (array: number[]) => Object.values(this.occurrences(array));

    /**
     *
     * @param {number[]} array
     * @param {number} n
     * @returns {boolean]
     *
     * Check if array contains N n of a same number
     */
    hasNOccurrences = (array: number[], n: number): boolean => {
        return this.occurrenceValues(array)
            .some(item => item >= n);
    };

    /**
     *
     * @param {number[]} array
     * @param {number} n
     * @returns {boolean}
     */
    hasNConsecutiveNumbers = (array: number[], n: number): boolean => {
        let counter = 0;

        for (let i = 1; i < array.length; i++) {
            if (array[i] === array[i - 1] + 1) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === n - 1) {
                return true;
            }
        }
        return false;
    };

    /**
     *
     * @param {number[]} dice
     * @param face
     * @return {boolean | number}
     */
    oneToSix = (dice: number[], face): boolean | number => {
        const occurences = this.occurrences(dice)[face];
        return isNullOrUndefined(occurences) ? false : face * occurences;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    threeOfKind = (dice: number[]): boolean | number => {
        return this.hasNOccurrences(dice, 3) ? points.threeOfKind(dice) : false;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    fourOfKind = (dice: number[]): boolean | number => {
        return this.hasNOccurrences(dice, 4) ? points.fourOfKind(dice) : false;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    fullHouse = (dice: number[]): boolean | number => {
        const occValues = this.occurrenceValues(dice);
        return occValues.includes(2) && occValues.includes(3) ? points.fullHouse : false;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    smallStraight = (dice: number[]): boolean | number => {
        return this.hasNConsecutiveNumbers(dice, 4) ? points.smallStraight : false;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    largeStraight = (dice: number[]): boolean | number => {
        return this.hasNConsecutiveNumbers(dice, 5) ? points.largeStraight : false;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    yam = (dice: number[]): boolean | number => {
        return this.occurrenceValues(dice).length === 1 ? points.yam : false;
    };

    rulesMapping = {
        [scores.one]: (dice, score) => this.oneToSix(dice, score),
        [scores.two]: (dice, score) => this.oneToSix(dice, score),
        [scores.three]: (dice, score) => this.oneToSix(dice, score),
        [scores.four]: (dice, score) => this.oneToSix(dice, score),
        [scores.five]: (dice, score) => this.oneToSix(dice, score),
        [scores.six]: (dice, score) => this.oneToSix(dice, score),
        [scores.threeOfKind]: (dice, score) => this.threeOfKind(dice),
        [scores.fourOfKind]: (dice, score) => this.fourOfKind(dice),
        [scores.fullHouse]: (dice, score) => this.fullHouse(dice),
        [scores.smallStraight]: (dice, score) => this.smallStraight(dice),
        [scores.largeStraight]: (dice, score) => this.largeStraight(dice),
        [scores.yam]: (dice, score) => this.yam(dice),
        [scores.chance]: (dice, score) => dice.reduce((val, acc) => val + acc)
    };

    constructor() {
    }

    /**
     * @param {number[]} dice
     * @return any
     */
    getScoreValues(dice: number[]) {
        const scoreValues = {};

        Object.values(scores).forEach(score => {
            Object.assign(scoreValues, {[score] : this.rulesMapping[score](dice, +score)});
        });

        return scoreValues;
    }

}
