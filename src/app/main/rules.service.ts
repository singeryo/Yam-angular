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
     * @returns {{}}
     */
    occurrences = (array: number[]) => array.reduce(this.occurrencesReducer, {});

    /**
     *
     * @param {number[]} dice
     * @param {number} occurrences
     *
     * Check if dice array contains N occurrences of a same number
     */
    hasNOccurrences(dice: number[], occurrences: number) {
        return Object
            .values(this.occurrences(dice))
            .some(item => item >= occurrences);
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
        // Occurrence values are either 2,3 or 3,2
        return JSON.stringify([2, 3]) ===
            JSON.stringify(Object.values((this.occurrences(dice))).sort()) ? points.fullHouse : false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    smallStraight(dice: number[]): boolean | number {
        return false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    largeStraight(dice: number[]): boolean | number {
        return false;
    }

    /**
     *
     * @param {number[]} dice
     * @returns {boolean | number}
     */
    yam(dice: number[]): boolean | number {
        return false;
    }

}
