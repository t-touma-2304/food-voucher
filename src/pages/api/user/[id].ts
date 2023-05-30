import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "PUT") {
    return handlePut(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  } else {
    return res.status(500).end();
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  // URL から [id](の具体的な値) を取得する
  // (例) URL が /api/user/cl7ts8yvu0045ssa2e2vcrezk の場合 id = cl7ts8yvu0045ssa2e2vcrezk 
  const id = req.query.id as string;
  const targetUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (targetUser) {
    res.status(200).json(targetUser);
  } else {
    res.status(404).end();
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  // URL から [id](の具体的な値) を取得する
  // (例) URL が /api/user/cl7ts8yvu0045ssa2e2vcrezk の場合 id = cl7ts8yvu0045ssa2e2vcrezk 
  const id = req.query.id as string;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    //if (e instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).end();
  }
};

const handleDelete = async (
    req: NextApiRequest,
    res: NextApiResponse<User>
  ) => {
    const id = req.query.id as string;
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletedUser);
  };