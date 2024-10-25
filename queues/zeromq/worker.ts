import * as zmq from 'zeromq';

export namespace QueuesZeromqWorker {
    export const run = async () => {
        const sock = new zmq.Pull()

        sock.connect("tcp://127.0.0.1:3000")
        console.log("Worker connected to port 3000")

        for await (const [msg] of sock) {
            console.log("work: %s", msg.toString())
        }
    }
}