
exports = module.exports = {

    checkCoppia: function (a, b) {
        return a == b;
    },

    isAssopluskappa: function (a, b) {
        return ((a === 'A') && (b === 'K')) || ((a === 'K') && (b === 'A'))
    },

    rankingCard: function (rank) {
        if (rank === '2' || rank === '3' ||
            rank === '3' || rank === '4' || rank === '5' || rank === '6' || rank === '7'
            || rank === '8' || rank === '9' || rank === '10') return rank;

        if (rank === 'J') return '11';
        if (rank === 'Q') return '12';
        if (rank === 'K') return '13';
        if (rank === 'A') return '14';
    },

    betterThanOrEqual: function (card, value) {
        return card >= value;
    },

    isConnected: function (a, b) {
        var a = parseInt(a);
        var b = parseInt(b);

        return (a + 1 === b) || b + 1 === a;
    },

    isSuited: function (suitA, suitB) {
        return suitA === suitB;
    },

    bet: function (gamestate, bet) {
        var allInAmount = 10000000;
        var me = gamestate.me;

        var myCards = gamestate.players[me].cards;
        var firstCard = myCards[0].rank;
        var firstSuit = myCards[0].type;
        var secondCard = myCards[1].rank;
        var secondSuit = myCards[1].type;
        var pot = gamestate.pot;
        var call = gamestate.callAmount;

        // Vado allin con una coppia
        if (this.checkCoppia(firstCard, secondCard)) {
            if (this.betterThanOrEqual(this.rankingCard(firstCard), '11'))
                return bet(allInAmount);

            return bet(call * 3);
        }

        if (this.isAssopluskappa(firstCard, secondCard)) {
            return bet(allInAmount);
        }

        if (this.isConnected(firstCard, secondCard) && this.isSuited(firstSuit, secondSuit)) {
            if (this.betterThanOrEqual(firstCard, '11'))
                return bet(call * 3);

            return bet(call);
        }


        return bet(0);


    }
