import {TestBed, inject} from '@angular/core/testing';

import {RulesService} from './rules.service';

describe('RulesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RulesService]
        });
    });

    it('should be created', inject([RulesService], (service: RulesService) => {
        expect(service).toBeTruthy();
    }));

    it('Should count 1, 2, 3', inject([RulesService], (service: RulesService) => {
        const test = [1, 2, 2, 3, 3, 3];
        expect(test.reduce(service.occurrences, {})).toEqual({ 1: 1, 2: 2, 3: 3 });
    }));

    it('Should count 1, 2, 3 array', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 2, 3, 3];
        expect(Object.values(test.reduce(service.occurrences, {})))
            .toEqual([3, 2]);
    }));

    it('Should be three of kind', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 2, 3, 3];
        expect(service.threeOfKind(test))
            .toEqual(12);
    }));

    it('Should be three of kind (4 identical)', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 2, 2, 3];
        expect(service.threeOfKind(test))
            .toEqual(11);
    }));

    it('Should not be three of kind', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 4, 4, 5];
        expect(service.threeOfKind(test))
            .toBeFalsy();
    }));

    it('Should be four of kind', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 2, 2, 5];
        expect(service.fourOfKind(test))
            .toEqual(13);
    }));

    it('Should not be four of kind', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 3, 3, 5];
        expect(service.fourOfKind(test))
            .toBeFalsy();
    }));

    it('Should be full house', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 3, 3, 3];
        expect(service.fullHouse(test))
            .toEqual(25);
    }));

    it('Should not be full house', inject([RulesService], (service: RulesService) => {
        const test = [2, 3, 3, 3, 3];
        expect(service.fullHouse(test))
            .toBeFalsy();
    }));

    it('Should be small straight', inject([RulesService], (service: RulesService) => {
        const test = [1, 2, 3, 4, 5];
        expect(service.smallStraight(test))
            .toEqual(35);
    }));

    it('Should be small straight', inject([RulesService], (service: RulesService) => {
        const test = [1, 2, 3, 4, 6];
        expect(service.smallStraight(test))
            .toEqual(35);
    }));

    it('Should not be small straight', inject([RulesService], (service: RulesService) => {
        const test = [1, 2, 2, 4, 5];
        expect(service.smallStraight(test))
            .toBeFalsy();
    }));

    it('Should be large straight', inject([RulesService], (service: RulesService) => {
        const test = [1, 2, 3, 4, 5];
        expect(service.largeStraight(test))
            .toEqual(40);
    }));

    it('Should not be large straight', inject([RulesService], (service: RulesService) => {
        const test = [1, 2, 3, 4, 6];
        expect(service.largeStraight(test))
            .toBeFalsy();
    }));

    it('Should be Yam', inject([RulesService], (service: RulesService) => {
        const test = [2, 2, 5, 5, 5];
        expect(service.yam(test))
            .toEqual(50);
    }));
});
