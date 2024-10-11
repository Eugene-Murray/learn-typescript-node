import { Effect } from "effect";

export namespace mutex {
  const task = Effect.gen(function* () {
    yield* Effect.log("start");
    yield* Effect.sleep("2 seconds");
    yield* Effect.log("end");
  });

  const semTask = (sem: Effect.Semaphore) => sem.withPermits(1)(task);

  const semTaskSeq = (sem: Effect.Semaphore) =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => semTask(sem).pipe(Effect.withLogSpan("elapsed")));

  const program = Effect.gen(function* () {
    const mutex = yield* Effect.makeSemaphore(1);
    yield* Effect.all(semTaskSeq(mutex), { concurrency: "unbounded" });
  });

  export const run = () => {
    Effect.runPromise(program);
  };
}
