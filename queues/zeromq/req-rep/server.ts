import * as zmq from "zeromq";

export namespace QueuesZeromqServer {
    export const run = async () => {
        const sock = new zmq.Request()
      
        sock.connect("tcp://127.0.0.1:3000")
        console.log("Producer bound to port 3000")
      
        await sock.send("4")
        const [result] = await sock.receive()
      
        console.log(result)
      }
}