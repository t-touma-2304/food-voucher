import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const role_admin = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
    },
  });
  const role_user = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
    },
  });
  const office1 = await prisma.office.upsert({
    where: { code: "100" },
    update: {},
    create: {
      name: "OCC",
      code: "100",
    },
  });
  const office2 = await prisma.office.upsert({
    where: { code: "200" },
    update: {},
    create: {
      name: "STN",
      code: "200",
     // parentId: office1.id,
    },
  });
  const office3 = await prisma.office.upsert({
    where: { code: "300" },
    update: {},
    create: {
      name: "C&C",
      code: "300",
      //parentId: office1.id,
    },
  });
  const admin = await prisma.user.upsert({
    where: { email: "admin@ts.occ.co.jp" },
    update: {},
    create: {
      name: "admin",
      no: "0001",
      email: "admin@ts.occ.co.jp",
      password: "admin",
      roleId: role_admin.id,
      officeId: office2.id,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@ts.occ.co.jp" },
    update: {},
    create: {
      name: "user",
      no: "0002",
      email: "user@ts.occ.co.jp",
      password: "user",
      roleId: role_user.id,
      officeId: office3.id,
    },
  });
  console.log({ admin, user });

  /*
  const tc1 = await prisma.thanksCard.upsert({
    where: { id: "thanks_card_test1" },
    update: {},
    create: {
      title: "thankscard1 title",
      body: "thankscard1 body",
      fromId: admin.id,
      toId: user.id,
    },
  });
  const tc2 = await prisma.thanksCard.upsert({
    where: { id: "thanks_card_test2" },
    update: {},
    create: {
      title: "thankscard2 title",
      body: "thankscard2 body",
      fromId: user.id,
      toId: admin.id,
    },
  });
  const tc3 = await prisma.thanksCard.upsert({
    where: { id: "thanks_card_test3" },
    update: {},
    create: {
      title: "thankscard3 title",
      body: "thankscard3 body",
      fromId: user.id,
      toId: admin.id,
    },
  });
  console.log({ tc1, tc2, tc3 });
  */
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });