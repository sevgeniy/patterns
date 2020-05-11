function Interval(start, end) {
    var start = start,
        end = end;

    return {
        current: start,
        end: end,
        next() {
            return this.current <= this.end ? this.current++ : null;
        },
        hasNext() {
            return this.current <= this.end;
        },
        rewind() {
            this.current = start;
        },
    };
}

export default Interval;
