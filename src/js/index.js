import { client } from './proxy.js';

console.log(client.getSum(1, 2));
console.log(client.getSum(1, 3));
setTimeout(() => client.getSum(1, 4), 500);
setTimeout(() => console.log('test'), 600);
