import { logMethod } from "../decorators";

export class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @logMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

