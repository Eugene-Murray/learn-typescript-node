import "reflect-metadata";
import {container} from "tsyringe";
import {Foo} from "./foo";

export namespace TsyringeSimple {
    export const run = () => {
        const instance = container.resolve(Foo);
        console.log(instance);
    }
}