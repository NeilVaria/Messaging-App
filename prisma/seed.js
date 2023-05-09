// Seeding Function

// Creates 3 users, 3 tasks and 3 projects

// Prisma Client
const { PrismaClient, Role, ArticleType, TaskStatus } = require('@prisma/client')
const prisma = new PrismaClient()

// NB: use upserting function for seeding

async function main() {

    //Create users

    const user1 = await prisma.User.upsert({ 
        where: {
            username: "charlottebruns"
        },
        update: {

        },
        create:{
            name: "Charlotte Burns",
            username:  "charlottebruns", 
            role: "admin",
            email: "charlotte@makeitall.com", 
            password: "password", 
        }, 
    })

    const user2 = await prisma.User.upsert({ 
        where: {
            username: "caroline"
        },
        update: {

        },


        create:{
            name: "Caroline Tew",
            username:  "caroline", 
            role: "admin",
            email: "caroline@makeitall.com", 
            password: "password", 
        }, 
    })

    const user3 = await prisma.User.upsert({ 
        where: {
            username: "jeffery"
        },
        update: {

        },
        create:{
            name: "Jeffery wiillaims",
            username:  "jeffery", 
            role: "user",
            email: "jeff@makeitall.com", 
            password: "password", 
        }, 
    })

    const user4 = await prisma.User.upsert({ 
        where: {
            username: "donald"
        },
        update: {

        },
        create:{
            name: "Donald brand",
            username:  "donald", 
            role: "user",
            email: "donald@makeitall.com", 
            password: "password", 
        }, 
    })

    //Create projects

    const project1 = await prisma.Projects.upsert({ 
        where: {
            id: "project1"
        },
        update: {

        },
        create:{ 
            id: "project1",
            name: "Project A", 
            description: "Project A description,",
            deadline: new Date('2023-05-31T23:59:59.000Z'),
            completed: false, 
        }
    })


    const project2 = await prisma.Projects.upsert({ 
        where: {
            id: "project2"
        },
        update: {

        },
        create:{ 
            id: "project2",
            name: "Project B", 
            description: "Project B description.",
            deadline: new Date('2023-07-31T23:59:59.000Z'),
            completed: false, 
        }
    })

    
    const project3 = await prisma.Projects.upsert({ 
        where: {
            id: "project3"
        },
        update: {

        },
        create:{ 
            id: "project3",
            name: "Project C",
            description: "Project A description,",
            deadline: new Date('2023-06-04T23:59:59.000Z'),
            completed: true, 
        }
    })

    //Create tasks and assign to users and projects

    const task1 = await prisma.Tasks.upsert({ 
        where: {
            id: "task1"
        },
        update: {

        },
        create:{ 
            id: "taskA",
            name: "Task A",
            description: "Task A description", 
            hours: 10, 
            dueDate: new Date('2023-06-04T23:59:59.000Z'),
            completed: false,
            manhours: 0, 
            project:{connect: {id:project1.id}}, 
            members: {connect:  [{id:user4.id} ]} 

        }
    })

    const task2 = await prisma.Tasks.upsert({ 
        where: {
            id: "taskB"
        },
        update: {

        },
        create:{ 
            id: "taskB",
            name: "Task B",
            description: "Task B description", 
            hours: 5, 
            dueDate: new Date('2023-09-01T23:59:59.000Z'),
            completed: false,
            manhours: 3, 
            project:{connect: {id:project3.id}}, 
            members: {connect:  [{id:user3.id} ]} 

        }
    })

    const task3 = await prisma.Tasks.upsert({
        where: {
            id: "taskC"
        },
        update: {

        }, 
        create:{ 
            id: "taskC",
            name: "Task C",
            description: "Task A description", 
            hours: 20, 
            dueDate: new Date('2023-07-04T23:59:59.000Z'),
            completed: false,
            manhours: 6, 
            project:{connect: {id:project2.id}}, 
            members: {connect:  {id:user1.id}} 

        }
    })
      
      const taskD = await prisma.Tasks.upsert({
        where: {
          id: "taskD"
        },
        update: {
      
        },
        create: {
          id: "taskD",
          name: "Task D",
          description: "Task D description",
          hours: 15,
          dueDate: new Date('2023-06-03T23:59:59.000Z'),
          completed: true,
          completionDate: new Date('2023-06-02T23:59:59.000Z'),
          manhours: 5,
          project: { connect: { id: project3.id } },
          members: { connect: { id: user1.id } }
        }
      });
      
      const taskE = await prisma.Tasks.upsert({
        where: {
          id: "taskE"
        },
        update: {
      
        },
        create: {
          id: "taskE",
          name: "Task E",
          description: "Task E description",
          hours: 8,
          dueDate: new Date('2023-06-04T23:59:59.000Z'),
          completed: true,
          completionDate: new Date('2023-06-04T23:59:59.000Z'),
          manhours: 4,
          project: { connect: { id: project2.id } },
          members: { connect: { id: user2.id } }
        }
      });
      
      const taskF = await prisma.Tasks.upsert({
        where: {
          id: "taskF"
        },
        update: {
      
        },
        create: {
          id: "taskF",
          name: "Task F",
          description: "Task F description",
          hours: 10,
          dueDate: new Date('2023-06-05T23:59:59.000Z'),
          completed: false,
          manhours: 0,
          project: { connect: { id: project1.id } },
          members: { connect: { id: user3.id } }
        }
      });
      
      const taskG = await prisma.Tasks.upsert({
        where: {
          id: "taskG"
        },
        update: {
      
        },
        create: {
          id: "taskG",
          name: "Task G",
          description: "Task G description",
          hours: 6,
          dueDate: new Date('2023-06-06T23:59:59.000Z'),
          completed: true,
          completionDate: new Date('2023-06-06T23:59:59.000Z'),
          manhours: 3,
          project: { connect: { id: project2.id } },
          members: { connect: { id: user3.id } }
        }
      });
      
      const taskH = await prisma.Tasks.upsert({
        where: {
          id: "taskH"
        },
        update: {
      
        },
        create: {
            id: "taskH",
            name: "Task H",
            description: "Task H description",
            hours: 6,
            dueDate: new Date('2023-06-06T23:59:59.000Z'),
            completed: true,
            completionDate: new Date('2023-06-06T23:59:59.000Z'),
            manhours: 3,
            project: { connect: { id: project3.id } },
            members: { connect: { id: user4.id } }
          }
        });


        const taskI = await prisma.Tasks.upsert({
            where: {
              id: "taskI"
            },
            update: {
          
            },
            create: {
              id: "taskI",
              name: "Task I",
              description: "Task I description",
              hours: 8,
              dueDate: new Date('2023-01-07T23:59:59.000Z'),
              completed: true,
              completionDate: new Date('2023-01-05T23:59:59.000Z'),
              manhours: 4,
              project: { connect: { id: project3.id } },
              members: { connect: { id: user1.id } }
            }
          });
          
          const taskJ = await prisma.Tasks.upsert({
            where: {
              id: "taskJ"
            },
            update: {
          
            },
            create: {
              id: "taskJ",
              name: "Task J",
              description: "Task J description",
              hours: 10,
              dueDate: new Date('2023-09-05T23:59:59.000Z'),
              completed: false,
              manhours: 0,
              project: { connect: { id: project1.id } },
              members: { connect: { id: user2.id } }
            }
          });
          
          const taskK = await prisma.Tasks.upsert({
            where: {
              id: "taskK"
            },
            update: {
          
            },
            create: {
              id: "taskK",
              name: "Task K",
              description: "Task K description",
              hours: 6,
              dueDate: new Date('2023-02-07T23:59:59.000Z'),
              completed: true,
              completionDate: new Date('2023-02-06T23:59:59.000Z'),
              manhours: 3,
              project: { connect: { id: project2.id } },
              members: { connect: { id: user2.id } }
            }
          });
          
          const taskL = await prisma.Tasks.upsert({
            where: {
              id: "taskL"
            },
            update: {
          
            },
            create: {
                id: "taskL",
                name: "Task L",
                description: "Task L description",
                hours: 4,
                dueDate: new Date('2023-04-04T23:59:59.000Z'),
                completed: true,
                completionDate: new Date('2023-04-04T23:59:59.000Z'),
                manhours: 3,
                project: { connect: { id: project1.id } },
                members: { connect: { id: user4.id } }
              }
            });

          const taskM = await prisma.Tasks.upsert({
              where: {
                id: "taskM"
              },
              update: {
            
              },
              create: {
                  id: "taskM",
                  name: "Task M",
                  description: "Task M description",
                  hours: 10,
                  dueDate: new Date('2023-01-04T23:59:59.000Z'),
                  completed: true,
                  completionDate: new Date('2023-03-04T23:59:59.000Z'),
                  manhours: 3,
                  project: { connect: { id: project1.id } },
                  members: { connect: { id: user4.id } }
                }
            });
              
              const taskN = await prisma.Tasks.upsert({
                where: {
                  id: "taskN"
                },
                update: {
              
                },
                create: {
                    id: "taskN",
                    name: "Task N",
                    description: "Task N description",
                    hours: 1,
                    dueDate: new Date('2023-02-04T23:59:59.000Z'),
                    completed: true,
                    completionDate: new Date('2023-03-04T23:59:59.000Z'),
                    manhours: 3,
                    project: { connect: { id: project1.id } },
                    members: { connect: { id: user4.id } }
                  }
                });

                const taskO = await prisma.Tasks.upsert({
                  where: {
                    id: "taskO"
                  },
                  update: {
                
                  },
                  create: {
                      id: "taskO",
                      name: "Task O",
                      description: "Task O description",
                      hours: 6,
                      dueDate: new Date('2023-05-04T23:59:59.000Z'),
                      completed: true,
                      completionDate: new Date('2023-05-04T23:59:59.000Z'),
                      manhours: 3,
                      project: { connect: { id: project1.id } },
                      members: { connect: { id: user4.id } }
                    }
                  });

                  const taskP = await prisma.Tasks.upsert({
                    where: {
                      id: "taskP"
                    },
                    update: {
                  
                    },
                    create: {
                        id: "taskP",
                        name: "Task P",
                        description: "Task P description",
                        hours: 6,
                        dueDate: new Date('2023-11-04T23:59:59.000Z'),
                        completed: true,
                        completionDate: new Date('2023-12-04T23:59:59.000Z'),
                        manhours: 3,
                        project: { connect: { id: project1.id } },
                        members: { connect: { id: user4.id } }
                      }
                    });

                    const taskQ = await prisma.Tasks.upsert({
                      where: {
                        id: "taskQ"
                      },
                      update: {
                    
                      },
                      create: {
                          id: "taskQ",
                          name: "Task Q",
                          description: "Task Q description",
                          hours: 6,
                          dueDate: new Date('2023-01-04T23:59:59.000Z'),
                          completed: true,
                          completionDate: new Date('2023-01-04T23:59:59.000Z'),
                          manhours: 3,
                          project: { connect: { id: project1.id } },
                          members: { connect: { id: user4.id } }
                        }
                      });

                      const taskR = await prisma.Tasks.upsert({
                        where: {
                          id: "taskR"
                        },
                        update: {
                      
                        },
                        create: {
                            id: "taskR",
                            name: "Task R",
                            description: "Task R description",
                            hours: 6,
                            dueDate: new Date('2023-02-04T23:59:59.000Z'),
                            completed: true,
                            completionDate: new Date('2023-03-04T23:59:59.000Z'),
                            manhours: 3,
                            project: { connect: { id: project1.id } },
                            members: { connect: { id: user4.id } }
                          }
                        });

                        const taskS = await prisma.Tasks.upsert({
                          where: {
                            id: "taskS"
                          },
                          update: {
                        
                          },
                          create: {
                              id: "taskS",
                              name: "Task S",
                              description: "Task S description",
                              hours: 6,
                              dueDate: new Date('2023-05-04T23:59:59.000Z'),
                              completed: true,
                              completionDate: new Date('2023-05-04T23:59:59.000Z'),
                              manhours: 3,
                              project: { connect: { id: project1.id } },
                              members: { connect: { id: user4.id } }
                            }
                          });

                          const taskT = await prisma.Tasks.upsert({
                            where: {
                              id: "taskT"
                            },
                            update: {
                          
                            },
                            create: {
                                id: "taskT",
                                name: "Task T",
                                description: "Task T description",
                                hours: 6,
                                dueDate: new Date('2023-06-04T23:59:59.000Z'),
                                completed: true,
                                completionDate: new Date('2023-05-04T23:59:59.000Z'),
                                manhours: 3,
                                project: { connect: { id: project1.id } },
                                members: { connect: { id: user4.id } }
                              }
                            });

                            const taskU = await prisma.Tasks.upsert({
                              where: {
                                id: "taskU"
                              },
                              update: {
                            
                              },
                              create: {
                                  id: "taskU",
                                  name: "Task U",
                                  description: "Task U description",
                                  hours: 6,
                                  dueDate: new Date('2023-07-04T23:59:59.000Z'),
                                  completed: true,
                                  completionDate: new Date('2023-07-04T23:59:59.000Z'),
                                  manhours: 3,
                                  project: { connect: { id: project1.id } },
                                  members: { connect: { id: user4.id } }
                                }
                              });

                              const taskV = await prisma.Tasks.upsert({
                                where: {
                                  id: "taskV"
                                },
                                update: {
                              
                                },
                                create: {
                                    id: "taskV",
                                    name: "Task V",
                                    description: "Task V description",
                                    hours: 6,
                                    dueDate: new Date('2023-07-04T23:59:59.000Z'),
                                    completed: true,
                                    completionDate: new Date('2023-08-04T23:59:59.000Z'),
                                    manhours: 3,
                                    project: { connect: { id: project1.id } },
                                    members: { connect: { id: user4.id } }
                                  }
                                });

                                const taskW = await prisma.Tasks.upsert({
                                  where: {
                                    id: "taskW"
                                  },
                                  update: {
                                
                                  },
                                  create: {
                                      id: "taskW",
                                      name: "Task W",
                                      description: "Task W description",
                                      hours: 6,
                                      dueDate: new Date('2023-08-04T23:59:59.000Z'),
                                      completed: true,
                                      completionDate: new Date('2023-09-04T23:59:59.000Z'),
                                      manhours: 3,
                                      project: { connect: { id: project1.id } },
                                      members: { connect: { id: user4.id } }
                                    }
                                  });

                                  const taskX = await prisma.Tasks.upsert({
                                    where: {
                                      id: "taskX"
                                    },
                                    update: {
                                  
                                    },
                                    create: {
                                        id: "taskX",
                                        name: "Task X",
                                        description: "Task X description",
                                        hours: 6,
                                        dueDate: new Date('2023-10-04T23:59:59.000Z'),
                                        completed: true,
                                        completionDate: new Date('2023-10-04T23:59:59.000Z'),
                                        manhours: 3,
                                        project: { connect: { id: project1.id } },
                                        members: { connect: { id: user4.id } }
                                      }
                                    });

                                    const taskY = await prisma.Tasks.upsert({
                                      where: {
                                        id: "taskY"
                                      },
                                      update: {
                                    
                                      },
                                      create: {
                                          id: "taskY",
                                          name: "Task Y",
                                          description: "Task Y description",
                                          hours: 6,
                                          dueDate: new Date('2023-09-04T23:59:59.000Z'),
                                          completed: true,
                                          completionDate: new Date('2023-11-04T23:59:59.000Z'),
                                          manhours: 3,
                                          project: { connect: { id: project1.id } },
                                          members: { connect: { id: user4.id } }
                                        }
                                      });

                                      const taskZ = await prisma.Tasks.upsert({
                                        where: {
                                          id: "taskZ"
                                        },
                                        update: {
                                      
                                        },
                                        create: {
                                            id: "taskZ",
                                            name: "Task Z",
                                            description: "Task Z description",
                                            hours: 6,
                                            dueDate: new Date('2023-11-04T23:59:59.000Z'),
                                            completed: true,
                                            completionDate: new Date('2023-12-04T23:59:59.000Z'),
                                            manhours: 3,
                                            project: { connect: { id: project1.id } },
                                            members: { connect: { id: user4.id } }
                                          }
                                        });

                                        const taskZ2 = await prisma.Tasks.upsert({
                                          where: {
                                            id: "taskZ2"
                                          },
                                          update: {
                                        
                                          },
                                          create: {
                                              id: "taskZ2",
                                              name: "Task Z2",
                                              description: "Task Z2 description",
                                              hours: 6,
                                              dueDate: new Date('2023-12-12T23:59:59.000Z'),
                                              completed: true,
                                              completionDate: new Date('2023-12-12T23:59:59.000Z'),
                                              manhours: 3,
                                              project: { connect: { id: project1.id } },
                                              members: { connect: { id: user4.id } }
                                            }
                                          });




    
    
}

main()
    .then(async () => {
        await prisma.$disconnect
    })
    .catch(async(e) => {
        console.log(e)
        await prisma.$disconnect
        process.exit(1)
    })