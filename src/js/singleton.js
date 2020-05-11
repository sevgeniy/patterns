function Universe() {
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }

    this.start_time = new Date();
    this.bang = 'Bang';

    Universe.instance = this;

    return this;
}

function Universe2() {
    var instance = this;

    this.start_time = new Date();
    this.bang = 'Bang2';

    Universe2 = function () {
        return instance;
    };
}

export { Universe, Universe2 };
