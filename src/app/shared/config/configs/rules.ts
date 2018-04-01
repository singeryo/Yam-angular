const points = {
    threeOfKind: (dice: number[]) => dice.reduce((acc, val) => acc + val),
    fourOfKind: (dice: number[]) => dice.reduce((acc, val) => acc + val),
    fullHouse: 25,
    smallStraight: 35,
    largeStraight: 40,
    yam: 50
};

export {points};
