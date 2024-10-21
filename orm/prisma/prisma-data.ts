import { PrismaClient } from "@prisma/client";
import { random } from "effect/Hash";

const prisma = new PrismaClient();

export namespace prismaData {
  export const run = async () => {
    const user = await prisma.user.create({
      data: {
        name: "Alice",
        email: `alice@prisma-${ Math.random() }.io`,
      },
    });
    console.log('Created user:', user);

    const user2 = await prisma.user.create({
      data: {
        name: 'Bob',
        email: `bob@prisma-${ Math.random() }.io`,
        posts: {
          create: [
            {
              title: 'Hello World',
              published: true
            },
            {
              title: 'My second post',
              content: 'This is still a draft'
            }
          ],
        },
      },
    });
    console.log('Created user and post:', user2);

    const users = await prisma.user.findMany();
    console.log('findMany users: ', users);

    const posts = await prisma.post.findMany();
    console.log('findMany posts: ', posts);
  };
}
