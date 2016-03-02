function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;

    this.Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    this.Suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    this.SuitMapping = { 'Spades': '♠', 'Hearts': '♥', 'Diamonds': '♦', 'Clubs': '♣' }
    this.toString = function () {
        return rank + this.SuitMapping[suit];
    };
    this.toAsciiString = function () {
        return rank + suit.substring(0, 1).toLowerCase();
    };
}