import * as console from "tracer";

//https://betterstack.com/community/guides/logging/best-nodejs-logging-libraries/

export namespace tracer {
  export const run = () => {
    const logger = console.colorConsole({});

    logger.log("hello");
    logger.trace("hello", "world");
    logger.debug("hello %s", "world", 123);
    logger.info("hello %s %d", "world", 123, { foo: "bar" });
    logger.warn("hello %s %d %j", "world", 123, { foo: "bar" });
    logger.error(
      "hello %s %d %j",
      "world",
      123,
      { foo: "bar" },
      [1, 2, 3, 4],
      Object
    );
  };
}
