import { AutoMap } from "@automapper/classes";
import { User } from "./user.entity";

export class UserDto {
    static fromUser(user: User): UserDto {
        throw new Error('Method not implemented.');
    }
    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;

    @AutoMap()
    fullName: string;

    @AutoMap()
    username: string;

    @AutoMap(() => BioDto)
    bio: BioDto;
}

export class BioDto {
    @AutoMap()
    jobTitle: string;

    @AutoMap()
    jobSalary: number;

    @AutoMap()
    birthday: string;

    @AutoMap()
    avatarUrl: string;
}