const points = {
    threeOfKind: (dice: number[]) => dice.reduce((acc, val) => acc + val),
    fourOfKind: (dice: number[]) => dice.reduce((acc, val) => acc + val),
    fullHouse: 25,
    smallStraight: 35,
    largeStraight: 40,
    yam: 50,
    bonus: 35
};

const scores = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    bonus: 'Prime',
    threeOfKind: 'Brelan',
    fourOfKind: 'Carré',
    fullHouse: 'Full',
    smallStraight: 'Petite suite',
    largeStraight: 'Grande suite',
    yam: 'Yam',
    chance: 'Chance',
    total: 'Total'
};

export {points, scores};
