class SocketConnect {
    constructor(url) {
        this.socket = new WebSocket(url);
    }

    onMessage(cb) {
        if (this.socket) {
            this.socket.addEventListener('message', (event) => {
                cb(JSON.parse(event.data));
            });
        }
    }

    onClose(cb) {
        if (this.socket) {
            this.socket.addEventListener('close', (event) => {
                if (event.wasClean) {
                    cb();
                } else {
                    cb(true);
                }
            });
        }
    }
}

const DIRECTIONS = ['left', 'right', 'up', 'down'];

let ws = new SocketConnect(`wss://presentation.recob.me/display${location.pathname}`);
console.log(ws);

ws.onMessage(({action}) => {
    if (DIRECTIONS.includes(action)) {
        Reveal[action]();
    }
});
