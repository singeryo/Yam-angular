import {isNullOrUndefined} from 'util';

export class Die {
    faces: number;
    currentFace = 1;

    selected = false;

    throw() {
        this.currentFace = Math.floor(Math.random() * Math.floor(this.faces)) + 1;
    }

    toggleSelected(value?: boolean) {
        this.selected = !isNullOrUndefined(value) ? value : !this.selected;
    }

    reset(value?: number) {
        this.currentFace = value || 1;
    }

    value() {
        return this.currentFace;
    }

    constructor(faces: number) {
        this.faces = faces;
        this.currentFace = 1;
    }
}
