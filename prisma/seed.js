// Seeding Function

// import bcrypt dynamically
const bcrypt = require("bcrypt");

// Prisma Client
const { PrismaClient, Role, ArticleType, TaskStatus } = require("@prisma/client");
const prisma = new PrismaClient();

// NB: use upserting function for seeding

async function main() {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash("password", salt);

  //remove all users from database
  await prisma.messageSeen.deleteMany({});
  await prisma.Message.deleteMany({});
  await prisma.roomMember.deleteMany({});
  await prisma.Room.deleteMany({});
  await prisma.User.deleteMany({});

  //Create users

  const user1 = await prisma.User.upsert({
    where: {
      username: "charlottebruns",
    },
    update: {},
    create: {
      name: "Charlotte Burns",
      username: "charlottebruns",
      role: "admin",
      email: "charlotte@makeitall.com",
      password: hash,
    },
  });

  const user2 = await prisma.User.upsert({
    where: {
      username: "caroline",
    },
    update: {},

    create: {
      name: "Caroline Tew",
      username: "caroline",
      role: "admin",
      email: "caroline@makeitall.com",
      password: hash,
    },
  });

  const user3 = await prisma.User.upsert({
    where: {
      username: "jeffery",
    },
    update: {},
    create: {
      name: "Jeffery wiillaims",
      username: "jeffery",
      role: "user",
      email: "jeff@makeitall.com",
      password: hash,
    },
  });

  const user4 = await prisma.User.upsert({
    where: {
      username: "donald",
    },
    update: {},
    create: {
      name: "Donald brand",
      username: "donald",
      role: "user",
      email: "donald@makeitall.com",
      password: hash,
    },
  });

  const user5 = await prisma.User.upsert({
    where: {
      username: "emily",
    },
    update: {},
    create: {
      name: "Emily Watson",
      username: "emily",
      role: "user",
      email: "emily@makeitall.com",
      password: hash,
    },
  });

  const user6 = await prisma.User.upsert({
    where: {
      username: "alex",
    },
    update: {},
    create: {
      name: "Alex Thompson",
      username: "alex",
      role: "user",
      email: "alex@makeitall.com",
      password: hash,
    },
  });

  const user7 = await prisma.User.upsert({
    where: {
      username: "natalie",
    },
    update: {},
    create: {
      name: "Natalie Jones",
      username: "natalie",
      role: "user",
      email: "natalie@makeitall.com",
      password: hash,
    },
  });

  const user8 = await prisma.User.upsert({
    where: {
      username: "michael",
    },
    update: {},
    create: {
      name: "Michael Johnson",
      username: "michael",
      role: "admin",
      email: "michael@makeitall.com",
      password: hash,
    },
  });

  const user9 = await prisma.User.upsert({
    where: {
      username: "sophie",
    },
    update: {},
    create: {
      name: "Sophie Anderson",
      username: "sophie",
      role: "user",
      email: "sophie@makeitall.com",
      password: hash,
    },
  });

  const user10 = await prisma.User.upsert({
    where: {
      username: "daniel",
    },
    update: {},
    create: {
      name: "Daniel Martinez",
      username: "daniel",
      role: "user",
      email: "daniel@makeitall.com",
      password: hash,
    },
  });

  const user11 = await prisma.User.upsert({
    where: {
      username: "tommo",
    },
    update: {},
    create: {
      name: "Thomas Whiticase",
      username: "tommo",
      role: "user",
      email: "tom@test.com",
      password: hash,
    },
  });

  const user12 = await prisma.User.upsert({
    where: {
      username: "ykapf",
    },
    update: {},
    create: {
      name: "Yusuf Kaplan",
      username: "ykapf",
      role: "user",
      email: "yusuf@test.com",
      password: hash,
    },
  });

  const user13 = await prisma.User.upsert({
    where: {
      username: "monkey",
    },
    update: {},
    create: {
      name: "Neil Varia",
      username: "monkey",
      role: "user",
      email: "neil@test.com",
      password: hash,
    },
  });

  const user14 = await prisma.User.upsert({
    where: {
      username: "skywalker",
    },
    update: {},
    create: {
      name: "Anikan Skywalker",
      username: "TheChosenOne",
      role: "user",
      email: "anikan@testing.com",
      password: hash,
    },
  });

  const user15 = await prisma.User.upsert({
    where: {
      username: "kenobi",
    },
    update: {},
    create: {
      name: "Obi Wan Kenobi",
      username: "TheWiseOne",
      role: "user",
      email: "obiwan@testing.com",
      password: hash,
    },
  });

  main()
    .then(async () => {
      await prisma.$disconnect;
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect;
      process.exit(1);
    });
}
