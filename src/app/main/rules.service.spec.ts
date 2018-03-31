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
        const test123 = [1, 2, 2, 3, 3, 3];
        expect(test123.reduce(service.occurrences, {})).toEqual({ 1: 1, 2: 2, 3: 3 });
    }));

    it('Should count 1, 2, 3 array', inject([RulesService], (service: RulesService) => {
        const test123 = [2, 2, 2, 3, 3];
        expect(Object.values(test123.reduce(service.occurrences, {})))
            .toEqual([3, 2]);
    }));

    it('Should be three of kind', inject([RulesService], (service: RulesService) => {
        const test123 = [2, 2, 2, 3, 3];
        expect(service.threeOfKind(test123))
            .toEqual(12);
    }));

    it('Should be three of kind (4 identical)', inject([RulesService], (service: RulesService) => {
        const test123 = [2, 2, 2, 2, 3];
        expect(service.threeOfKind(test123))
            .toEqual(11);
    }));

    it('Should not be three of kind', inject([RulesService], (service: RulesService) => {
        const test123 = [2, 2, 4, 4, 5];
        expect(service.threeOfKind(test123))
            .toBeFalsy();
    }));

});
