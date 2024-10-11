import { Worker, isMainThread,
    workerData, parentPort } from 'node:worker_threads';


export default function runThread() {

  if (isMainThread) {
    console.log('Main Thread');
    const data = 'some data';
    const worker = new Worker('./threads.mjs', { workerData: data });
    worker.on('message', msg => console.log('Reply from Thread:', msg));
  } else {
    const source = workerData;
    parentPort.postMessage(btoa(source.toUpperCase()));
  }
}