function Player(name, key) {
    this.name = name;
    this.key = key;
    this.points = 0;
    this.fire('newplayer', this);
}

Player.prototype.play = function () {
    this.points++;
    this.fire('play', this);
};

const publisher = {
    subscibers: [],
    on(type, handle, context) {
        type = type || 'any';
        if (this.subscibers[type] === undefined) {
            this.subscibers[type] = [];
        }
        this.subscibers[type].push({ handle, context });
    },
    remove(type, handle) {
        this.subscibers[type] = this.subscibers[type].filter(
            (h) => h.handle !== handle
        );
    },
    fire(type, args) {
        type = type || 'any';
        for (let i = 0; i < this.subscibers[type].length; i++) {
            let h = this.subscibers[type][i];

            h.handle.call(h.context, args);
        }
    },
};

function makePublisher(o) {
    for (let i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
            o[i] = publisher[i];
        }
    }
    o.subscibers = { any: [] };
}

let scoreContainer = document.getElementsByClassName('scoreBoard')[0];
let scoreBoard = {
    score: {},
    updateScore(score) {
        this.score = score;
        scoreContainer.textContent = score;
    },
};

let game = {
    keys: {},
    addPlayer: function (player) {
        player.id = Object.keys(this.keys).length;
        this.keys[player.key] = player;
    },
    onKeyPress(e) {
        if (this.keys[e.key] !== undefined) {
            this.keys[e.key].play();
        }
    },
    onScoreChange(player) {
        let score = Object.values(this.keys)
            .sort((a, b) => a.id - b.id)
            .map((p) => p.points)
            .join(':');
        scoreBoard.updateScore(score);
    },
};

game.onKeyPress = game.onKeyPress.bind(game);

makePublisher(game);
makePublisher(Player.prototype);

document.addEventListener('keypress', game.onKeyPress);
Player.prototype.on('newplayer', game.addPlayer, game);
Player.prototype.on('play', game.onScoreChange, game);

let player1 = new Player('player1', '1');
let player2 = new Player('player2', '0');
let player3 = new Player('player3', '2');

export { game as Observer };
