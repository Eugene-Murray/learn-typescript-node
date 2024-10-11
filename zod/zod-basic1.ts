import exp = require("constants");
import { z } from "zod";

export namespace ZodBasic1 {
  export const run = () => {
    const User = z.object({
      username: z.string(),
    });

    User.parse({ username: "Ludwig" });

    // extract the inferred type
    type User = z.infer<typeof User>;

    console.log(User);
  };
}

