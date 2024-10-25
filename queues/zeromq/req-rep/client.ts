import * as zmq from "zeromq";

export namespace QueuesZeromqClient {
    export const run = async () => {
        const sock = new zmq.Reply()
      
        await sock.bind("tcp://127.0.0.1:3000")
      
        for await (const [msg] of sock) {
          await sock.send((2 * parseInt(msg.toString(), 10)).toString())
        }
      }
}