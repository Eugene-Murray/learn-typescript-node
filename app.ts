import { zipDirectory } from "./fs-zip/zip-move-folder";
import { Person } from "./entities/Person";
import { UserService } from "./auto-mapper/user.service";
import { cons } from "effect/List";
import { mapper } from "./auto-mapper/mapper";
import { Bio, Job, User } from "./entities/user.entity";
import { BioDto, UserDto } from "./entities/user.dto";
import { createMappings } from "./auto-mapper/map";
import { createMap } from "@automapper/core";

import { prompt } from "enquirer";
import runThread from "./node-worker-threads/threads.mjs";
import { concurrency1 } from "./effect/concurrency/concurrency1";
import { mutex } from "./effect/concurrency/mutex";
import { tracer } from "./logging/tracer";
import { ZodBasic1 } from "./zod/zod-basic1";
import { prismaData } from "./orm/prisma/prisma-data";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const createPromt = async (): Promise<object> => {
    return prompt({
        type: "select",
        name: "task",
        message: "Select Task to run?",
        initial: 0,
        choices: [
          "zip folder",
          "node worker threads",
          "effect - concurrency 1",
          "effect - mutex",
          "logging - tracer",
          "zod - basic1",
          "prisma",
        ],
      });
}


const runApp = async () => {
  //   const response = await prompt({
  //     type: 'input',
  //     name: 'username',
  //     message: 'What is your username?'
  //   });

  const response1 = await createPromt();

  switch (response1["task"]) {
    case "zip folder":
      zipDirectory(
        "C:/Users/eugen/source/repos/Hacking/nodejs",
        "C:/Users/eugen/source/repos/Hacking/",
        "nodejs"
      )
        .then((result) => {
          console.log("Zipping operation completed.", result);
        })
        .finally(() => {
          console.log("Zipping operation completed.");
          runApp()
        })
        .catch((err) => {
          console.error("Error occurred while zipping.", err);
        });
      break;
    case "threads":
      console.log("\x1b[32m%s\x1b[0m", "lets so some threads");
      runThread();
      break;
    case "effect - concurrency 1":
      console.log("\x1b[32m%s\x1b[0m", "effect - concurrency 1");
      concurrency1.run();
      break;
    case "effect - mutex":
      console.log("\x1b[32m%s\x1b[0m", "effect - mutex");
      mutex.run();
      break;
    case "logging - tracer":
      console.log("\x1b[32m%s\x1b[0m", "logging - tracer");
      tracer.run();
      break;
    case "zod - basic1":
      console.log("\x1b[32m%s\x1b[0m", "zod - basic1");
      ZodBasic1.run();
      break;
    case "prisma":
        console.log("\x1b[32m%s\x1b[0m", "prisma");
        prismaData.run().then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
        })
        break;
    default:
      console.log("Invalid task");
  }
};

runApp();




// const askDrink = new Enquirer.Prompt({
//     type: 'select',
//     name: 'drink',
//     message: 'What do you like?',
//     initial: 2,
//     choices: [
//       'coffee',
//       'tea',
//       'pumpkin juice',
//     ]
//   });

//   const run = async () => {
//     const name = await askName.run();
//     //const drink = await askDrink.run();
//     //console.log(`${name} would like a cup of ${drink}`);
//   }

//   run();

// 1. Zip directory
// zipDirectory('C:/Users/eugen/source/repos/Hacking/nodejs',
//      'C:/Users/eugen/source/repos/Hacking/', 'nodejs').then((result) => {
//         console.log('Zipping operation completed.', result);
//      }).finally(() => {
//         console.log('Zipping operation completed.');
//      }).catch((err) => {
//         console.error('Error occurred while zipping.', err);
//      });

// 2. Decorators
// const p = new Person("Black Adder");
// p.greet();

// 3. Auto-mapper
// var userService = new UserService();
// const userDto = userService.getUserByUsername("eugene");
// console.log(userDto);

// createMap(mapper, Bio, BioDto);
// createMap(mapper, User, UserDto);

// const user = new User();
// user.firstName = 'Chau';
// user.lastName = 'Tran';
// user.username = 'ctran';
// user.password = '123456';
// user.bio = new Bio();
// user.bio.avatarUrl = 'google.com';
// user.bio.birthday = new Date();
// user.bio.job = new Job();
// user.bio.job.title = 'Developer';
// user.bio.job.salary = 99999;
// const dto = mapper.map(user, User, UserDto);

// console.log(dto);
