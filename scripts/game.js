let game = {
    cards: null,
    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    setCard: function (id) {
        let card = this.cards.filter(card => card.id == id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },


    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }

        return this.firstCard.icon == this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {
        if (this.cards.filter(card => !card.flipped).length == 0) {
            this.moveCount = 0;
            return true;
        }
    },

    createCards: function () {
        this.cards = [];

        for (let tech of this.techs) {
            this.cards.push(this.createPair(tech));
        }

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();

        return this.cards;
    },

    createPair: function (tech) {
        return [{
            id: this.createId(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createId(tech),
            icon: tech,
            flipped: false
        }]
    },

    createId: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}