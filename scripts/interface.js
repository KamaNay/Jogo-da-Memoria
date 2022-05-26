const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let inputName = document.getElementById("name");
let name = '';
let moves = 0;

function startGame() {
    name = inputName.value;

    if (name != "") {
        initializeCards(game.createCards());
        let playerNameLayer = document.getElementById("playerName");
        let gameBoardLayer = document.getElementById("gameBoard");
        playerNameLayer.style.display = "none";
        gameBoardLayer.style.display = "grid";
    } else {
        alert("Insira um nome para começar");
    }
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    for (let card of game.cards) {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    }
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "../images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            moves++;
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}

function restart() {
    game.clearCards();
    let gameOverLayer = document.getElementById("gameOver");
    let gameBoardLayer = document.getElementById("gameBoard");
    let playerNameLayer = document.getElementById("playerName");
    gameOverLayer.style.display = 'none';
    gameBoardLayer.style.display = "none"
    playerNameLayer.style.display = "block";
    inputName = '';
    moves = 0;
}

function savePlayer(name, moves) {
    let player = {
        id: name,
        moves: moves,
        position: 1
    }

    localStorage.setItem("Jogador", player);
}

function place() {
    let place = "1º";
    let players = [];

    players.push(localStorage.getItem("Jogador"));

    if (players.length > 1) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].moves > players[i+1].moves){
                players[i].position++;
            }
        }
    }
}

function updateRanking(player) {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>#${}</td>
        <td>${player.id}</td>
        <td>${player.moves}</td>
    `;
}