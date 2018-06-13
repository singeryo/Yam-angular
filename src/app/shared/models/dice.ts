export class Die {
    faces: number;
    currentFace = 1;

    selected = true;

    throw() {
        this.currentFace = Math.floor(Math.random() * Math.floor(this.faces)) + 1;
    }

    constructor(faces: number) {
        this.faces = faces;
        this.currentFace = 1;
    }
}
