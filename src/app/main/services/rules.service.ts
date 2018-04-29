import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {points} from '@app-config/config';

/**
 * Service meant to inject Yam rules to components
 */
@Injectable()
export class RulesService {

    constructor() {
    }

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
    hasNOccurrences(array: number[], n: number): boolean {
        return this.occurrenceValues(array)
            .some(item => item >= n);
    }

    /**
     *
     * @param {number[]} array
     * @param {number} n
     * @returns {boolean}
     */
    hasNConsecutiveNumbers(array: number[], n: number): boolean {
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
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    threeOfKind(dice: number[]): boolean | number {
        return this.hasNOccurrences(dice, 3) ? points.threeOfKind(dice) : false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    fourOfKind(dice: number[]): boolean | number {
        return this.hasNOccurrences(dice, 4) ? points.fourOfKind(dice) : false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    fullHouse(dice: number[]): boolean | number {
        const occValues = this.occurrenceValues(dice);
        return occValues.includes(2) && occValues.includes(3) ? points.fullHouse : false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    smallStraight(dice: number[]): boolean | number {
        return this.hasNConsecutiveNumbers(dice, 4) ? points.smallStraight : false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    largeStraight(dice: number[]): boolean | number {
        return this.hasNConsecutiveNumbers(dice, 5) ? points.largeStraight : false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    yam(dice: number[]): boolean | number {
        return this.occurrenceValues(dice).length === 1 ? points.yam : false;
    }

}