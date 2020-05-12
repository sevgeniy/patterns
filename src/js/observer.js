let publisher = {
    subscribers: [],

    subscribe(handler, type) {
        type = type || 'any';

        if (this.subscribers[type] === undefined) {
            this.subscribers[type] = [];
        }

        this.subscribers[type].push(handler);
    },

    unsubscribe(handle, type) {
        this.visitAllSubscribers('unsubscribe', handle, type);
    },

    publish(publication, type) {
        this.visitAllSubscribers('publish', publication, type);
    },

    visitAllSubscribers(action, args, type) {
        type = type || 'any';

        for (let i = 0; i < this.subscribers[type].length; i++) {
            if (action === 'publish') {
                this.subscribers[type][i](args);
            } else if (
                action === 'unsubscribe' &&
                this.subscribers[type][i] === args
            ) {
                this.subscribers[type].splice(i, 1);
            }
        }
    },
};

let joe = {
    read(args) {
        console.log(`Today Joe is reading ${args}.`);
    },

    readEveryMonth(args) {
        console.log(`This month Joe is reading ${args}.`);
    },

    comment(comment) {
        this.publish(comment, 'comment');
    },
};

let mike = {
    buy(args) {
        console.log(`Mike is buying ${args}.`);
    },
};

function makePublisher(o) {
    for (let i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
            o[i] = publisher[i];
        }
    }

    o.subscribers = { any: [] };
}

let paper = {
    daily() {
        this.publish('Daily newspaper');
    },
    monthly() {
        this.publish('Monthly newspaper', 'monthly');
    },
    readComments(args) {
        console.log(`Reader has commented the article: ${args}`);
    },
};

makePublisher(paper);
makePublisher(joe);

paper.subscribe(joe.read);
paper.subscribe(joe.read, 'monthly');
paper.subscribe(mike.buy, 'monthly');

paper.monthly();
paper.daily();

joe.subscribe(paper.readComments, 'comment');
joe.comment('Funny comment');
joe.comment('One more comment');

export { publisher as Observer };
