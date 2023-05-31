import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
      office: true,
    },
  });
  res.status(200).json(users);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse<User>) => {
    //const user: User = req.body;
    //const createdUser = await prisma.user.create({ data: user });
  
    /*
    // スプレッド構文を使用しない場合。
    // (補足)プロパティ名と変数名が一致しているため、プロパティ名は省略できる。
    const { name, email, password, roleId, officeId } = req.body;
    const createdUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        roleId: roleId,
        officeId: officeId,
      },
    });
    */
  
    // スプレッド構文を使用する場合
    try {
      const createdUser = await prisma.user.create({
        data: {
          ...req.body,
        },
      });
      res.status(200).json(createdUser);
    } catch (e) {
      //if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).end();
    }
  };