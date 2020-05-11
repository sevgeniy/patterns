import Sale from './decorator.js';

let sale = new Sale(140);
sale.decorate('Taxes');
sale.decorate('USD');

console.log(sale.getPrice());
