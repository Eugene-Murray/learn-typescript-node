import { AutoMap } from "@automapper/classes";

export class User {
    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;

    @AutoMap()
    username: string;

    password: string; // <- we purposely left this one out because we don't want to map "password"

    @AutoMap(() => Bio)
    bio: Bio;
}

export class Bio {
    @AutoMap(() => Job)
    job: Job;

    @AutoMap()
    birthday: Date;

    @AutoMap()
    avatarUrl: string;
}

export class Job {
    @AutoMap()
    title: string;

    @AutoMap()
    salary: number;
}