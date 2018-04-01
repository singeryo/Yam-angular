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
    occurrences = (acc, val) => {
        if (isNullOrUndefined(acc[val])) {
            acc[val] = 0;
        }
        acc[val]++;
        return acc;
    };

    /**
     *
     * @param {number[]} dice
     * @param {number} occurrences
     *
     * Check if dice array contains N occurrences of a same number
     */
    hasNOccurrences(dice: number[], occurrences: number) {
        return Object
            .values(dice.reduce(this.occurrences, {}))
            .some(item => item >= occurrences);
    }

    threeOfKind(dice: number[]): boolean | number {
        return this.hasNOccurrences(dice, 3) ? points.threeOfKind(dice) : false;
    }

    fourOfKind(dice: number[]): boolean | number {
        return this.hasNOccurrences(dice, 4) ? points.fourOfKind(dice) : false;
    }

    fullHouse(dice: number[]): boolean | number {
        // Occurrence values are either 2,3 or 3,2
        return JSON.stringify([2, 3]) ===
            JSON.stringify(Object.values(dice.reduce(this.occurrences, {})).sort()) ? points.fullHouse : false;
    }

    smallStraight(dice: number[]): boolean | number {
        return false;
    }

    largeStraight(dice: number[]): boolean | number {
        return false;
    }

    yam(dice: number[]): boolean | number {
        return false;
    }

}
