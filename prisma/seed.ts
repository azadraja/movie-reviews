const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

async function main() {
  await prisma.comment.create({
    data: {
      author: "Raja",
      content: {
        blocks: [
          {
            key: "foo",
            text: "Hello Raja Avinash",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 11,
                length: 7,
                style: "UNDERLINE",
              },
              {
                offset: 11,
                length: 7,
                style: "STRIKETHROUGH",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      movieId: 438631,
    },
  });
  await prisma.comment.create({
    data: {
      author: "test",
      content: {
        blocks: [
          {
            key: "foo",
            text: "Hello Raja Avinash",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 11,
                length: 7,
                style: "UNDERLINE",
              },
              {
                offset: 11,
                length: 7,
                style: "STRIKETHROUGH",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      movieId: 438631,
    },
  });
  await prisma.comment.create({
    data: {
      author: "avinash",
      content: {
        blocks: [
          {
            key: "foo",
            text: "Hello Raja Avinash",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 11,
                length: 7,
                style: "UNDERLINE",
              },
              {
                offset: 11,
                length: 7,
                style: "STRIKETHROUGH",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      movieId: 438631,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
