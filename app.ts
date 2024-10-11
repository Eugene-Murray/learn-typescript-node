import { zipDirectory } from "./zip-move-folder";
import { Person } from "./entities/Person";
import { UserService } from "./auto-mapper/user.service";
import { cons } from "effect/List";
import { mapper } from "./auto-mapper/mapper";
import { Bio, Job, User } from "./entities/user.entity";
import { BioDto, UserDto } from "./entities/user.dto";
import { createMappings } from "./auto-mapper/map";
import { createMap } from "@automapper/core";

// 1. Zip directory
zipDirectory('C:/Users/eugen/source/repos/Hacking/nodejs', 
     'C:/Users/eugen/source/repos/Hacking/', 'nodejs').then((result) => {
        console.log('Zipping operation completed.', result);
     }).finally(() => {  
        console.log('Zipping operation completed.');
     }).catch((err) => {
        console.error('Error occurred while zipping.', err);
     });


// 2. Decorators
// const p = new Person("Black Adder");
// p.greet();

// 3. Auto-mapper
// var userService = new UserService();
// const userDto = userService.getUserByUsername("eugene");
// console.log(userDto);

createMap(mapper, Bio, BioDto);
createMap(mapper, User, UserDto);

const user = new User();
user.firstName = 'Chau';
user.lastName = 'Tran';
user.username = 'ctran';
user.password = '123456';
user.bio = new Bio();
user.bio.avatarUrl = 'google.com';
user.bio.birthday = new Date();
user.bio.job = new Job();
user.bio.job.title = 'Developer';
user.bio.job.salary = 99999;
const dto = mapper.map(user, User, UserDto);

console.log(dto);