const points = {
    threeOfKind: (dice: number[]) => dice.reduce((acc, val) => acc + val),
    fourOfKind: (dice: number[]) => dice.reduce((acc, val) => acc + val),
    fullHouse: 25,
    smallStraight: 35,
    largeStraight: 40,
    yam: 50
};

const scores = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    threeOfKind: 'tok',
    fourOfKind: 'fok',
    fullHouse: 'fh',
    smallStraight: 'ss',
    largeStraight: 'ls',
    yam: 'yam',
    chance: 'ch'
};

export {points, scores};
