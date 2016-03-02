
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

    checkCommon: function (gamestate) {
        var commonCard = gamestate.commonCards;


        commonCard.forEach(function () {

        });
    },

    mainCore: function (gamestate, bet, firstcard, secondcard) {
        var call = gamestate.callAmount;

        if (this.checkCoppia(firstcard.rank, secondcard.rank)) {
            if (this.rankingCard(firstcard.rank) >= '11')
                return bet(call * 5);

            return bet(call * 5);
        }

        if (this.isAssopluskappa(secondcard.rank, secondcard.rank)) {
            return bet(call * 5);
        }

        if (this.isConnected(firstcard.rank, secondcard.rank) &&
            this.isSuited(firstcard.type, secondcard.type)) {
            if (firstcard.rank >= '11')
                return bet(call * 3);
        }

        return bet(0);
    },

    bet: function (gamestate, bet) {

        this.mainCore(gamestate.players[me].cards[0], gamestate.players[me].cards[1]);
        /*if (this.checkCoppia(gamestate.players[me].cards[0].rank, gamestate.players[me].cards[1].rank)) {
            if (this.rankingCard(gamestate.players[me].cards[0].rank) >= '11')
                return bet(call * 5);

            return bet(call * 5);
        }

        if (this.isAssopluskappa(gamestate.players[me].cards[1].rank, gamestate.players[me].cards[1].rank)) {
            return bet(call * 5);
        }

        if (this.isConnected(gamestate.players[me].cards[0].rank, gamestate.players[me].cards[1].rank) &&
         this.isSuited(gamestate.players[me].cards[0].type, gamestate.players[me].cards[1].type)) {
            if (gamestate.players[me].cards[0].rank >= '11')
                return bet(call * 3);
        }*/
    }
