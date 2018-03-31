import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {stringDistance} from 'codelyzer/util/utils';
import {containerStart} from '@angular/core/src/render3/instructions';

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

    threeOfKind(dice: number[]): boolean | number {
        const hasThreeOfKind = Object
            .values(dice.reduce(this.occurrences, {}))
            .find(item => item > 2) > 0;

        if (!hasThreeOfKind) {
            return false;
        }

        return dice.reduce((acc, val) => acc + val)
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
