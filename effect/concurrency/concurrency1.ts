import { Effect } from "effect";

export namespace concurrency1 {
  const fib = (n: number): Effect.Effect<number> =>
    Effect.suspend(() => {
      if (n <= 1) {
        return Effect.succeed(n);
      }
      return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b));
    });
  export const run = () => {
    const fib10Fiber = Effect.fork(fib(10));
    console.log("fib10Fiber", fib10Fiber);
  };
}
