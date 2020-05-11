function CarMaker() {}

CarMaker.prototype.drive = function () {
    console.log(`Vroom, I have ${this.doors} doors.`);
};

CarMaker.factory = function (type) {
    if (typeof CarMaker[type] !== 'function') {
        throw new Error(`Can't find constructor for type ${type}`);
    }

    if (CarMaker[type].prototype.drive !== 'function') {
        CarMaker[type].prototype = new CarMaker();
    }

    return new CarMaker[type]();
};

CarMaker.Compact = function () {
    this.doors = 2;
};

CarMaker.Convertible = function () {
    this.doors = 4;
};

CarMaker.SUV = function () {
    this.doors = 6;
};

export default CarMaker;
