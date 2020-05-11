function Sale(price) {
    this.price = price;
    this.decorators = [];
}

Sale.prototype.decorate = function (type) {
    this.decorators.push(type);
};

Sale.decorators = {
    USD: function (price) {
        return price > 0 ? '$' + price : 0;
    },
    Taxes: function (price) {
        return price * 1.2;
    },
};

Sale.prototype.getPrice = function () {
    let price = this.price;

    this.decorators.forEach((decorator) => {
        if (typeof Sale.decorators[decorator] === 'function') {
            price = Sale.decorators[decorator](price);
        }
    });

    return price;
};

export default Sale;
