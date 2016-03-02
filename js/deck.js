
function Deck() {
    var _self = this;
    //fake CARD
    var card = new Card('', '');

    this.cards = [];

    card.Suits.forEach(function (suit) {
        card.Ranks.forEach(function (rank) {
            var card = new Card(rank, suit);
            _self.cards.push(card);
        });

    });
    // Public: Performs a proper Fisher-Yates shuffle.
    //
    // Returns nothing; the shuffle is in-place.
    this.shuffle = function () {
        var temp, idx;
        var cardsRemaining = this.cards.length;

        // While there remain elements to shuffle…
        while (cardsRemaining) {

            // Pick a remaining element…
            idx = Math.floor(Math.random() * cardsRemaining--);

            // And swap it with the current element.
            temp = this.cards[cardsRemaining];
            this.cards[cardsRemaining] = this.cards[idx];
            this.cards[idx] = temp;
        }
    };

    this.drawCard = function () {
        return this.cards.shift();
    };

    this.toString = function () {
        return this.cards.join();
    };

    this.toAsciiString = function () {
        return this.cards.map(function (card) { card.toAsciiString() }).join();
    };
}
