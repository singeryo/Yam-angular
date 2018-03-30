import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable()
export class RulesService {

    constructor() {
    }

    /**
     *
     * @param acc
     * @param val
     * @returns {any}
     *
     * Meant to be used with reduce,
     * returns object containing occurrences of array items
     */
    occurences = (acc, val) => {
        if (isNullOrUndefined(acc[val])) {
            acc[val] = 0;
        }
        acc[val]++;
        return acc;
    }


    arrayUnique(value, index, self) {
        // Filter out all duplicates
        return self.indexOf(value) === index;
    }

    threeOfKind(dice: number[]): boolean | number {
        return false;
    }

    fourOfKind(dice: number[]): boolean | number {
        return false;
    }

    fullHouse(dice: number[]): boolean | number {
        return false;
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
