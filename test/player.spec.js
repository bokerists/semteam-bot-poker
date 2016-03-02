
var assert = chai.assert;

function checkCoppia(a, b) {
    return a == b;
}

function isAssopluskappa(a, b) {
    return ((a === 'A') && (b === 'K')) || ((a === 'K') && (b === 'A'))
}

function rankingCard(rank) {
    if (rank === '2' || rank === '3' ||
        rank === '3' || rank === '4' ||
        rank === '5' || rank === '6' ||
        rank === '7' || rank === '8' ||
        rank === '9' || rank === '10') return rank;

    if (rank === 'J') return '11';
    if (rank === 'Q') return '12';
    if (rank === 'K') return '13';
    if (rank === 'A') return '14';
}

function betterThanOrEqual(card, value) {
    return card >= value;
}

describe('Player', function () {
    it('checkCoppia', function () {
        assert(checkCoppia(2, 2));
        assert(checkCoppia(2, 3) === false);
    });

    it('isAssoPlusKappa', function () {
        assert(isAssopluskappa('A', 'K'));
        assert(isAssopluskappa('K', 'K') === false);
    });

    it('rankingCard checca', function () {
        assert(rankingCard('4') == '4');
        assert(rankingCard('J') !== 'J');
        assert(rankingCard('J') !== '10');
    });
    
    it('betterThanEqual checca', function () {
        assert(betterThanOrEqual('4',5) === false);
        assert(betterThanOrEqual('4',4));
    })
});