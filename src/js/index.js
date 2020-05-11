import Interval from './iterator.js';

let interval = new Interval(1, 10);

while (interval.hasNext()) {
    console.log(interval.next());
}
