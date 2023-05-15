// Seeding Function

// import bcrypt dynamically
const bcrypt = require("bcrypt");

// Creates 3 users, 3 tasks and 3 projects

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

  //Create projects

  const project1 = await prisma.Projects.upsert({
    where: {
      id: "project1",
    },
    update: {},
    create: {
      id: "project1",
      name: "Project A",
      description: "Project A description",
      deadline: new Date("2023-05-31T23:59:59.000Z"),
      completed: false,
    },
  });

  const project2 = await prisma.Projects.upsert({
    where: {
      id: "project2",
    },
    update: {},
    create: {
      id: "project2",
      name: "Project B",
      description: "Project B description",
      deadline: new Date("2023-07-31T23:59:59.000Z"),
      completed: false,
    },
  });

  const project3 = await prisma.Projects.upsert({
    where: {
      id: "project3",
    },
    update: {},
    create: {
      id: "project3",
      name: "Project C",
      description: "Project C description",
      deadline: new Date("2023-06-04T23:59:59.000Z"),
      completed: true,
    },
  });

  const project4 = await prisma.Projects.upsert({
    where: {
      id: "project4",
    },
    update: {},
    create: {
      id: "project4",
      name: "Project D",
      description: "Project D description",
      deadline: new Date("2023-04-30T23:59:59.000Z"),
      completed: true,
    },
  });

  const project5 = await prisma.Projects.upsert({
    where: {
      id: "project5",
    },
    update: {},
    create: {
      id: "project5",
      name: "Project E",
      description: "Project E description",
      deadline: new Date("2023-05-15T23:59:59.000Z"),
      completed: true,
    },
  });

  const project6 = await prisma.Projects.upsert({
    where: {
      id: "project6",
    },
    update: {},
    create: {
      id: "project6",
      name: "Project F",
      description: "Project F description",
      deadline: new Date("2023-07-15T23:59:59.000Z"),
      completed: false,
    },
  });

  const project7 = await prisma.Projects.upsert({
    where: {
      id: "project7",
    },
    update: {},
    create: {
      id: "project7",
      name: "Project G",
      description: "Project G description",
      deadline: new Date("2023-07-15T23:59:59.000Z"),
      completed: false,
    },
  });

  //Create tasks and assign to users and projects
  const taskA = await prisma.Tasks.upsert({
    where: {
      id: "taskA",
    },
    update: {},
    create: {
      id: "taskA",
      name: "Task A",
      description: "Task A description",
      hours: 10,
      dueDate: new Date("2023-06-04T23:59:59.000Z"),
      completed: false,
      manhours: 5,
      project: { connect: { id: project1.id } },
      members: { connect: [{ id: user1.id }] },
    },
  });

  const taskB = await prisma.Tasks.upsert({
    where: {
      id: "taskB",
    },
    update: {},
    create: {
      id: "taskB",
      name: "Task B",
      description: "Task B description",
      hours: 8,
      dueDate: new Date("2023-05-15T23:59:59.000Z"),
      completed: true,
      manhours: 8,
      project: { connect: { id: project2.id } },
      members: { connect: [{ id: user2.id }] },
    },
  });

  const taskC = await prisma.Tasks.upsert({
    where: {
      id: "taskC",
    },
    update: {},
    create: {
      id: "taskC",
      name: "Task C",
      description: "Task C description",
      hours: 6,
      dueDate: new Date("2023-06-30T23:59:59.000Z"),
      completed: true,
      manhours: 6,
      project: { connect: { id: project3.id } },
      members: { connect: [{ id: user3.id }] },
    },
  });

  const taskD = await prisma.Tasks.upsert({
    where: {
      id: "taskD",
    },
    update: {},
    create: {
      id: "taskD",
      name: "Task D",
      description: "Task D description",
      hours: 12,
      dueDate: new Date("2023-04-30T23:59:59.000Z"),
      completed: true,
      manhours: 12,
      project: { connect: { id: project4.id } },
      members: { connect: [{ id: user4.id }] },
    },
  });

  const taskE = await prisma.Tasks.upsert({
    where: {
      id: "taskE",
    },
    update: {},
    create: {
      id: "taskE",
      name: "Task E",
      description: "Task E description",
      hours: 9,
      dueDate: new Date("2023-07-10T23:59:59.000Z"),
      completed: false,
      manhours: 6,
      project: { connect: { id: project2.id } },
      members: { connect: [{ id: user5.id }] },
    },
  });

  const taskF = await prisma.Tasks.upsert({
    where: {
      id: "taskF",
    },
    update: {},
    create: {
      id: "taskF",
      name: "Task F",
      description: "Task F description",
      hours: 7,
      dueDate: new Date("2023-05-20T23:59:59.000Z"),
      completed: true,
      manhours: 7,
      project: { connect: { id: project6.id } },
      members: { connect: [{ id: user6.id }] },
    },
  });

  const taskG = await prisma.Tasks.upsert({
    where: {
      id: "taskG",
    },
    update: {},
    create: {
      id: "taskG",
      name: "Task G",
      description: "Task G description",
      hours: 8,
      dueDate: new Date("2023-04-15T23:59:59.000Z"),
      completed: false,
      manhours: 4,
      project: { connect: { id: project6.id } },
      members: { connect: [{ id: user6.id }] },
    },
  });

  const taskH = await prisma.Tasks.upsert({
    where: {
      id: "taskH",
    },
    update: {},
    create: {
      id: "taskH",
      name: "Task H",
      description: "Task H description",
      hours: 6,
      dueDate: new Date("2023-05-30T23:59:59.000Z"),
      completed: false,
      manhours: 3,
      project: { connect: { id: project7.id } },
      members: { connect: [{ id: user7.id }] },
    },
  });

  const taskI = await prisma.Tasks.upsert({
    where: {
      id: "taskI",
    },
    update: {},
    create: {
      id: "taskI",
      name: "Task I",
      description: "Task I description",
      hours: 12,
      dueDate: new Date("2023-06-30T23:59:59.000Z"),
      completed: true,
      manhours: 12,
      project: { connect: { id: project5.id } },
      members: { connect: [{ id: user8.id }] },
    },
  });

  const taskJ = await prisma.Tasks.upsert({
    where: {
      id: "taskJ",
    },
    update: {},
    create: {
      id: "taskJ",
      name: "Task J",
      description: "Task J description",
      hours: 9,
      dueDate: new Date("2023-07-10T23:59:59.000Z"),
      completed: false,
      manhours: 6,
      project: { connect: { id: project1.id } },
      members: { connect: [{ id: user9.id }] },
    },
  });

  const taskK = await prisma.Tasks.upsert({
    where: {
      id: "taskK",
    },
    update: {},
    create: {
      id: "taskK",
      name: "Task K",
      description: "Task K description",
      hours: 7,
      dueDate: new Date("2023-05-20T23:59:59.000Z"),
      completed: true,
      manhours: 7,
      project: { connect: { id: project4.id } },
      members: { connect: [{ id: user10.id }] },
    },
  });

  const taskL = await prisma.Tasks.upsert({
    where: {
      id: "taskL",
    },
    update: {},
    create: {
      id: "taskL",
      name: "Task L",
      description: "Task L description",
      hours: 8,
      dueDate: new Date("2023-06-15T23:59:59.000Z"),
      completed: true,
      manhours: 8,
      project: { connect: { id: project3.id } },
      members: { connect: [{ id: user1.id }] },
    },
  });

  const taskM = await prisma.Tasks.upsert({
    where: {
      id: "taskM",
    },
    update: {},
    create: {
      id: "taskM",
      name: "Task M",
      description: "Task M description",
      hours: 6,
      dueDate: new Date("2023-05-30T23:59:59.000Z"),
      completed: false,
      manhours: 3,
      project: { connect: { id: project2.id } },
      members: { connect: [{ id: user2.id }] },
    },
  });

  const taskN = await prisma.Tasks.upsert({
    where: {
      id: "taskN",
    },
    update: {},
    create: {
      id: "taskN",
      name: "Task N",
      description: "Task N description",
      hours: 12,
      dueDate: new Date("2023-06-30T23:59:59.000Z"),
      completed: true,
      manhours: 12,
      project: { connect: { id: project3.id } },
      members: { connect: [{ id: user3.id }] },
    },
  });

  const taskO = await prisma.Tasks.upsert({
    where: {
      id: "taskO",
    },
    update: {},
    create: {
      id: "taskO",
      name: "Task O",
      description: "Task O description",
      hours: 9,
      dueDate: new Date("2023-04-10T23:59:59.000Z"),
      completed: false,
      manhours: 6,
      project: { connect: { id: project6.id } },
      members: { connect: [{ id: user4.id }] },
    },
  });

  const taskP = await prisma.Tasks.upsert({
    where: {
      id: "taskP",
    },
    update: {},
    create: {
      id: "taskP",
      name: "Task P",
      description: "Task P description",
      hours: 7,
      dueDate: new Date("2023-05-20T23:59:59.000Z"),
      completed: true,
      manhours: 7,
      project: { connect: { id: project5.id } },
      members: { connect: [{ id: user5.id }] },
    },
  });

  const taskQ = await prisma.Tasks.upsert({
    where: {
      id: "taskQ",
    },
    update: {},
    create: {
      id: "taskQ",
      name: "Task Q",
      description: "Task Q description",
      hours: 8,
      dueDate: new Date("2023-06-15T23:59:59.000Z"),
      completed: false,
      manhours: 4,
      project: { connect: { id: project1.id } },
      members: { connect: [{ id: user6.id }] },
    },
  });

  const taskR = await prisma.Tasks.upsert({
    where: {
      id: "taskR",
    },
    update: {},
    create: {
      id: "taskR",
      name: "Task R",
      description: "Task R description",
      hours: 6,
      dueDate: new Date("2023-05-30T23:59:59.000Z"),
      completed: true,
      manhours: 6,
      project: { connect: { id: project3.id } },
      members: { connect: [{ id: user7.id }] },
    },
  });

  const taskS = await prisma.Tasks.upsert({
    where: {
      id: "taskS",
    },
    update: {},
    create: {
      id: "taskS",
      name: "Task S",
      description: "Task S description",
      hours: 12,
      dueDate: new Date("2023-06-30T23:59:59.000Z"),
      completed: false,
      manhours: 8,
      project: { connect: { id: project2.id } },
      members: { connect: [{ id: user8.id }] },
    },
  });

  const taskT = await prisma.Tasks.upsert({
    where: {
      id: "taskT",
    },
    update: {},
    create: {
      id: "taskT",
      name: "Task T",
      description: "Task T description",
      hours: 9,
      dueDate: new Date("2023-07-10T23:59:59.000Z"),
      completed: true,
      manhours: 9,
      project: { connect: { id: project4.id } },
      members: { connect: [{ id: user9.id }] },
    },
  });

  const taskU = await prisma.Tasks.upsert({
    where: {
      id: "taskU",
    },
    update: {},
    create: {
      id: "taskU",
      name: "Task U",
      description: "Task U description",
      hours: 7,
      dueDate: new Date("2023-04-20T23:59:59.000Z"),
      completed: false,
      manhours: 5,
      project: { connect: { id: project6.id } },
      members: { connect: [{ id: user10.id }] },
    },
  });

  const taskV = await prisma.Tasks.upsert({
    where: {
      id: "taskV",
    },
    update: {},
    create: {
      id: "taskV",
      name: "Task V",
      description: "Task V description",
      hours: 8,
      dueDate: new Date("2023-06-15T23:59:59.000Z"),
      completed: false,
      manhours: 4,
      project: { connect: { id: project6.id } },
      members: { connect: [{ id: user6.id }] },
    },
  });

  const taskW = await prisma.Tasks.upsert({
    where: {
      id: "taskW",
    },
    update: {},
    create: {
      id: "taskW",
      name: "Task W",
      description: "Task W description",
      hours: 6,
      dueDate: new Date("2023-05-30T23:59:59.000Z"),
      completed: true,
      manhours: 6,
      project: { connect: { id: project7.id } },
      members: { connect: [{ id: user7.id }] },
    },
  });

  const taskX = await prisma.Tasks.upsert({
    where: {
      id: "taskX",
    },
    update: {},
    create: {
      id: "taskX",
      name: "Task X",
      description: "Task X description",
      hours: 12,
      dueDate: new Date("2023-06-30T23:59:59.000Z"),
      completed: false,
      manhours: 8,
      project: { connect: { id: project7.id } },
      members: { connect: [{ id: user8.id }] },
    },
  });

  const taskY = await prisma.Tasks.upsert({
    where: {
      id: "taskY",
    },
    update: {},
    create: {
      id: "taskY",
      name: "Task Y",
      description: "Task Y description",
      hours: 9,
      dueDate: new Date("2023-07-10T23:59:59.000Z"),
      completed: true,
      manhours: 9,
      project: { connect: { id: project4.id } },
      members: { connect: [{ id: user9.id }] },
    },
  });

  const taskZ = await prisma.Tasks.upsert({
    where: {
      id: "taskZ",
    },
    update: {},
    create: {
      id: "taskZ",
      name: "Task Z",
      description: "Task Z description",
      hours: 7,
      dueDate: new Date("2023-05-20T23:59:59.000Z"),
      completed: false,
      manhours: 5,
      project: { connect: { id: project6.id } },
      members: { connect: [{ id: user10.id }] },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect;
    process.exit(1);
  });
