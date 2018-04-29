export class Dice {
    faces: number;
    currentFace = 1;

    constructor(face?: number) {
        this.currentFace = face || 1;
    }
}
