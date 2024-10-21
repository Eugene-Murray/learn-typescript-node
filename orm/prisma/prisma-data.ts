import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export namespace prismaData {
    export const run = async () => {
        const user = await prisma.user.create({
            data: {
              name: 'Alice',
              email: 'alice@prisma.io',
            },
          });
          console.log(user);
    }
}