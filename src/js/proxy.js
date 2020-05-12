class Client {
    constructor(proxy) {}

    getSum(a, b) {
        return proxy.add(a, b);
    }
}

class Server {
    add(a, b) {
        return a + b;
    }
}

class Proxy {
    constructor(server) {
        this.server = server;
        this.calls = [];
        this.timeoutId = undefined;

        this.execute = this.execute.bind(this);
    }

    add(a, b) {
        this.calls.push({
            args: arguments,
        });

        if (!this.timeoutId) {
            this.timeoutId = setTimeout(this.execute, 500);
        }
    }

    execute() {
        this.timeoutId = null;
        console.log(this.calls);

        for (let call of this.calls) {
            const result = server.add.apply(this, call.args);
            console.log(result);
        }

        this.calls = [];
    }
}

const server = new Server();
const proxy = new Proxy();
const client = new Client(proxy);

export { client };
