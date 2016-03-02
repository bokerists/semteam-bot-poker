
exports = module.exports = {

    checkCoppia: function (a, b) {
        return a == b;
    },

    isAssopluskappa: function (a, b) {
        return ((a === 'A') && (b === 'K')) || ((a === 'K') && (b === 'A'))
    },

    rankingCard: function (rank) {
        if (rank === '2' || rank === '3' ||
            rank === '3' || rank === '4' ||
            rank === '5' || rank === '6' ||
            rank === '7' || rank === '8' ||
            rank === '9' || rank === '10') return rank;

        if (rank === 'J') return '11';
        if (rank === 'Q') return '12';
        if (rank === 'K') return '13';
        if (rank === 'A') return '14';
    },

    betterThanOrEqual: function (card, value) {
        return card >= value;
    },

    isConnected: function (a, b) {
        return (parseInt(a) + 1 === parseInt(b)) || parseInt(b) + 1 === parseInt(a);
    },

    isSuited: function (suitA, suitB) {
        return suitA === suitB;
    },

    bet: function (gamestate, bet) {
        var me = gamestate.me;

        var firstCard = gamestate.players[me].cards[0].rank;
        var firstSuit = gamestate.players[me].cards[0].type;
        var secondCard = gamestate.players[me].cards[1].rank;
        var secondSuit = gamestate.players[me].cards[1].type;
        var call = gamestate.callAmount;

        if (this.checkCoppia(firstCard, secondCard)) {
            if (this.rankingCard(firstCard) >= '11')
                return bet(call * 5);

            return bet(call * 5);
        }

        if (this.isAssopluskappa(firstCard, secondCard)) {
            return bet(call * 5);
        }

        if (this.isConnected(firstCard, secondCard) && this.isSuited(firstSuit, secondSuit)) {
            if (firstCard >= '11')
                return bet(call * 3);
        }
        return bet(0);
    }
