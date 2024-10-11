import { zipDirectory } from "./zip-move-folder";
import { Person } from "./entities/Person";
import { UserService } from "./auto-mapper/user.service";
import { cons } from "effect/List";
import { mapper } from "./auto-mapper/mapper";
import { Bio, Job, User } from "./entities/user.entity";
import { BioDto, UserDto } from "./entities/user.dto";
import { createMappings } from "./auto-mapper/map";
import { createMap } from "@automapper/core";

import { prompt } from 'enquirer';

const run = async () => {
//   const response = await prompt({
//     type: 'input',
//     name: 'username',
//     message: 'What is your username?'
//   });

  const response1 = await prompt({
        type: 'select',
        name: 'task',
        message: 'Select Task to run?',
        initial: 0,
        choices: [
          'zip folder',
          'tea',
          'pumpkin juice',
        ]
      });

  switch(response1['task']) {
    case 'zip folder':
        zipDirectory('C:/Users/eugen/source/repos/Hacking/nodejs', 
        'C:/Users/eugen/source/repos/Hacking/', 'nodejs').then((result) => {
            console.log('Zipping operation completed.', result);
        }).finally(() => {  
            console.log('Zipping operation completed.');
        }).catch((err) => {
            console.error('Error occurred while zipping.', err);
        });
        break;
    case 'tea':
        console.log('\x1b[32m%s\x1b[0m', 'tea');
        break;
    case 'pumpkin juice':
        console.log('pumpkin juice');
        break;
    default:
        console.log('Invalid task');
  }
};

run();


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