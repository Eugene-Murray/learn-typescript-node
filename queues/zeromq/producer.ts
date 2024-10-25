import * as zmq from 'zeromq';
import { DateTime } from 'luxon';

export namespace QueuesZeromqProducer {
    export const run = async () => {
        const sock = new zmq.Push()
      
        await sock.bind("tcp://127.0.0.1:3000")
        console.log("Producer bound to port 3000")
      
        while (true) {
          await sock.send(`some work ${ DateTime.now().toString() }`)
          await new Promise(resolve => {
            setTimeout(resolve, 500)
          })
        }
      }
}