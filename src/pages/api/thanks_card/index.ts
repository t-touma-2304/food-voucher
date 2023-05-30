// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ThanksCard } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";
import { isValidToken } from "@/utils/isValidToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ThanksCard[]>
) {
  if (!isValidToken(req)) res.status(401).end();

  const thanks_cards = await prisma.thanksCard.findMany({
    include: {
      from: true,
      to: true,
    },
  });
  res.status(200).json(thanks_cards);
}