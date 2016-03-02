
var assert = chai.assert;


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
    });
    
});