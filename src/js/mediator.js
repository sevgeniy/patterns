class Player {
    constructor(name, points, mediator) {
        this.name = name;
        this.points = points;
        this.mediator = mediator;
    }

    play() {
        this.points++;
        this.mediator.played();
    }
}

class Mediator {
    constructor() {
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    setup(scoreBoard) {
        this.players = [
            new Player('player1', 0, this),
            new Player('player2', 0, this),
        ];
        this.scoreBoard = scoreBoard;
    }

    played() {
        let score = this.players.reduce((result, player) => {
            result[player.name] = player.points;
            return result;
        }, {});

        scoreBoard.updateScore(score);
    }

    onKeyPress(e) {
        if (e.key === '1') {
            this.players[0].play();
        } else if (e.key === '0') {
            this.players[1].play();
        }
    }
}

class ScoreBoard {
    constructor(score) {
        this.score = score;

        this.scoreBoard = document.getElementsByClassName('scoreBoard')[0];
    }

    updateScore(score) {
        this.score = Object.assign(this.score, score);
        this.scoreBoard.textContent = `${this.score.player1 || 0} : ${
            this.score.player2 || 0
        }`;
    }
}

const scoreBoard = new ScoreBoard({});
const mediator = new Mediator();
mediator.setup();

document.addEventListener('keypress', mediator.onKeyPress);

export { Mediator };
