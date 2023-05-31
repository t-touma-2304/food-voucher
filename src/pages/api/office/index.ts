// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Office } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Office[]>
) {
  const offices = await prisma.office.findMany();
  res.status(200).json(offices);
}