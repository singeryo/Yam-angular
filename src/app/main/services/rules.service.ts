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
     * Check if array contains N of a same number
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
        let copy = Array.from(array);

        // Sort and remove duplicates to prevent unexpected behaviour
        copy.sort();
        copy = Array.from(new Set(copy));

        for (let i = 1; i < copy.length; i++) {
            if (copy[i] === copy[i - 1] + 1) {
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
        return isNullOrUndefined(occurences) ? 0 : face * occurences;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    threeOfKind = (dice: number[]): boolean | number => {
        return this.hasNOccurrences(dice, 3) ? points.threeOfKind(dice) : 0;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    fourOfKind = (dice: number[]): boolean | number => {
        return this.hasNOccurrences(dice, 4) ? points.fourOfKind(dice) : 0;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    fullHouse = (dice: number[]): boolean | number => {
        const occValues = this.occurrenceValues(dice);
        return occValues.includes(2) && occValues.includes(3) ? points.fullHouse : 0;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    smallStraight = (dice: number[]): boolean | number => {
        return this.hasNConsecutiveNumbers(dice, 4) ? points.smallStraight : 0;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    largeStraight = (dice: number[]): boolean | number => {
        return this.hasNConsecutiveNumbers(dice, 5) ? points.largeStraight : 0;
    };

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    yam = (dice: number[]): boolean | number => {
        return this.occurrenceValues(dice).length === 1 ? points.yam : 0;
    };


    /**
     * @return number
     * @param scoreTable
     */
    bonus = (scoreTable: {val: number, filled: boolean}) => scoreTable[scores.one].val
    + scoreTable[scores.two].val
    + scoreTable[scores.three].val
    + scoreTable[scores.four].val
    + scoreTable[scores.five].val
    + scoreTable[scores.six].val >= 63 ? points.bonus : 0;

    /**
     * @param scoreTable
     */
    total = (scoreTable) => Object.values(scores).reduce(((acc: number, score: string) => score !== scores.total ? acc + scoreTable[score].val : acc), 0);

    rulesMapping = {
        [scores.one]: this.oneToSix,
        [scores.two]: this.oneToSix,
        [scores.three]: this.oneToSix,
        [scores.four]: this.oneToSix,
        [scores.five]: this.oneToSix,
        [scores.six]: this.oneToSix,
        [scores.threeOfKind]: this.threeOfKind,
        [scores.fourOfKind]: this.fourOfKind,
        [scores.fullHouse]: this.fullHouse,
        [scores.smallStraight]: this.smallStraight,
        [scores.largeStraight]: this.largeStraight,
        [scores.yam]: this.yam,
        [scores.chance]: (dice, score) => dice.reduce((val, acc) => val + acc)
    };

    calculatedValues = {
        [scores.bonus]: this.bonus,
        [scores.total]: this.total
    };

    constructor() {
    }

    /**
     * @param {number[]} dice
     * @return any
     */
    getScoreValues(dice: number[]) {
        const scoreValues = {};

        Object.keys(this.rulesMapping).forEach(score => {
            Object.assign(scoreValues, {[score] : this.rulesMapping[score](dice, +score)});
        });

        return scoreValues;
    }

    isCalculated(score: string) {
        return Object.keys(this.calculatedValues).find(val => val === score) !== undefined;
    }

}
