
var cards = {
    "2c": 1,
    "2d": 2,
    "2h": 3,
    "2s": 4,
    "3c": 5,
    "3d": 6,
    "3h": 7,
    "3s": 8,
    "4c": 9,
    "4d": 10,
    "4h": 11,
    "4s": 12,
    "5c": 13,
    "5d": 14,
    "5h": 15,
    "5s": 16,
    "6c": 17,
    "6d": 18,
    "6h": 19,
    "6s": 20,
    "7c": 21,
    "7d": 22,
    "7h": 23,
    "7s": 24,
    "8c": 25,
    "8d": 26,
    "8h": 27,
    "8s": 28,
    "9c": 29,
    "9d": 30,
    "9h": 31,
    "9s": 32,
    "tc": 33,
    "td": 34,
    "th": 35,
    "ts": 36,
    "jc": 37,
    "jd": 38,
    "jh": 39,
    "js": 40,
    "qc": 41,
    "qd": 42,
    "qh": 43,
    "qs": 44,
    "kc": 45,
    "kd": 46,
    "kh": 47,
    "ks": 48,
    "ac": 49,
    "ad": 50,
    "ah": 51,
    "as": 52
};

var ThreeCardConverter = {
    CARDVALS: ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],
    CARDS: cards,
    makesStraight: function (cardsUsed, rank) {
        //add ace to bottom as well
        var newCards = [cardsUsed[12]].concat(cardsUsed);
        //add in new card (pushed up one by ace)
        newCards[rank + 1] = 2;
        //determine if there are 5 cards in a row
        return 5 === newCards.reduce(function (prev, next) {
            if (prev === 5) {
                return 5;
            } else {
                return next ? prev + 1 : 0;
            }
        });
    },

    fillHand: function (cards) {

        var cardsUsed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        //convert each card to vals 0-12, strip suit
        cards.forEach(function (card) {
            var i = Math.floor((this.CARDS[card.toLowerCase()] - 1) / 4);
            cardsUsed[i] = 1;
        }, this);

        var toFill = 2; //need to fill 2 cards

        //fill in <toFill> cards to complete 5 card hand
        for (var i = 0; i < 13; i++) {
            if (toFill == 0) break; //done filling
            //prevent adding a card to finish a straight
            if (cardsUsed[i] == 0 && !this.makesStraight(cardsUsed, i)) {
                cardsUsed[i] = 2;
                toFill--;
            }
        }

        //fill dummy cards for lowest possible hand
        var suit = ['s', 'd'];
        for (var i = 0; i <= 13; i++) {
            if (cardsUsed[i] == 2) {
                var card = this.CARDVALS[i] + suit[0];
                suit.splice(0, 1);
                cards.push(card);
            }
        }
        return cards;
    }
};

var pokerEvaluator = {
    HANDTYPES: [
        "invalid hand",
        "high card",
        "one pair",
        "two pairs",
        "three of a kind",
        "straight",
        "flush",
        "full house",
        "four of a kind",
        "straight flush"
    ],
    CARDS: cards,
    evalHand: function (cards) {
        if (!this.ranks) {
            throw new Error("HandRanks.dat not loaded");
        }

        if (cards.length != 7 && cards.length != 6 && cards.length != 5 && cards.length != 3) {
            throw new Error("Hand must be 3, 5, 6, or 7cards");
        }

        //if 3 card hand, fill in to make 5 card
        if (cards.length == 3) {
            cards = ThreeCardConverter.fillHand(cards);
        }

        //if passing in string formatted hand, convert first
        if (typeof cards[0] == "string") {
            cards = cards.map(function (card) {
                return this.CARDS[card.toLowerCase()];
            }.bind(this));
        }

        return this.eval(cards);
    },

    eval: function (cards) {
        var p = 53;
        for (var i = 0; i < cards.length; i++) {
            p = this.evalCard(p + cards[i]);
        }

        if (cards.length == 5 || cards.length == 6) {
            p = this.evalCard(p)
        }

        return {
            handType: p >> 12,
            handRank: p & 0x00000fff,
            value: p,
            handName: this.HANDTYPES[p >> 12]
        }
    },

    evalCard: function (card) {
        return this.ranks.readUInt32LE(card * 4);
    }
}


function Combinations() {
  
    this.k_combinations = function (set, k) {
        var i, j, combs, head, tailcombs;

        if (k > set.length || k <= 0) {
            return [];
        }

        if (k === set.length) {
            return [set];
        }

        if (k === 1) {
            combs = [];
            for (i = 0; i < set.length; i++) {
                combs.push([set[i]]);
            }
            return combs;
        }

        // Assert {1 < k < set.length}

        combs = [];
        for (i = 0; i < set.length - k + 1; i++) {
            head = set.slice(i, i + 1);
            tailcombs = Combinations.k_combinations(set.slice(i + 1), k - 1);
            for (j = 0; j < tailcombs.length; j++) {
                combs.push(head.concat(tailcombs[j]));
            }
        }
        return combs;
    }


    this.combinations = function (set) {
        var k, i, combs, k_combs;
        combs = [];

        // Calculate all non-empty k-combinations
        for (k = 1; k <= set.length; k++) {
            k_combs = Combinations.k_combinations(set, k);
            for (i = 0; i < k_combs.length; i++) {
                combs.push(k_combs[i]);
            }
        }
        return combs;
    }
};

function HandEvaluator() {

    // Public: For each player, create a 7-card hand by combining their hole
    // cards with the board, then pass that to our evaluator library to get the
    // type of hand and its ranking among types. If it's better than the best
    // hand we've seen so far, assign a winner.
    //
    // players - Players in the hand
    // playerHands - A map of player ID to their hand
    // board - An array of five {Card} objects representing the board
    //
    // Returns an object containing the winning player(s) and information about
    // their hand(s).
    this.evaluateHands = function (players, playerHands, board) {
        var bestHand = { handType: 0, handRank: 0 };
        var winners = [];
        var cardArray = null;

        players.forEach(function (player) {
            var sevenCardHand = [playerHands[player.id], board];
            var evalInput = sevenCardHand.map(function (card) { card.toAsciiString() });
            var currentHand = pokerEvaluator.evalHand(evalInput);

            if (currentHand.handType > bestHand.handType ||
                (currentHand.handType === bestHand.handType &&
                    currentHand.handRank > bestHand.handRank)) {
                winners = [];
                winners.push(player);

                bestHand = currentHand;
                cardArray = sevenCardHand;
            } else if (currentHand.handType === bestHand.handType &&
                currentHand.handRank === bestHand.handRank) {
                winners.push(player);
            }
        });

        return {
            winners: winners,
            hand: HandEvaluator.bestFiveCardHand(cardArray),
            handName: bestHand.handName,
            isSplitPot: winners.length > 1
        };
    }

    // Private: Determines the best possible 5-card hand from a 7-card hand. To
    // do this, we first need to get all the unique 5-card combinations, then
    // have our hand evaluator rank them.
    //
    // sevenCardHand - An array of seven {Card} objects
    //
    // Returns an array of five {Card} objects
    this.bestFiveCardHand = function (sevenCardHand) {
        var fiveCardHands = Combinations.k_combinations(sevenCardHand, 5);
        var bestHand = { handType: 0, handRank: 0 };
        var cardArray = null;

        fiveCardHands.forEach(function (fiveCardHand) {
            var evalInput = fiveCardHand.map(card => card.toAsciiString());
            var currentHand = pokerEvaluator.evalHand(evalInput);

            if (currentHand.handType > bestHand.handType ||
                (currentHand.handType === bestHand.handType && currentHand.handRank > bestHand.handRank)) {
                bestHand = currentHand;
                cardArray = fiveCardHand;
            }
        });
        return cardArray;
    }
}
