import React from "react";
import useSWR from "swr";
import { Prisma } from "@prisma/client";

/* ライブラリ Material-UI が提供するコンポーネントの import */
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { fetcher } from "@/utils/fetcher";

function ThanksCardList() {
  /* ThanksCard の外部キー(From, To)も含んだ型を定義している */
  type ThanksCardPayload = Prisma.ThanksCardGetPayload<{
    include: {
      from: true;
      to: true;
    };
  }>;
  /* SWR を使用して /api/thanks_card からデータを取得し、 thanks_cards 配列で受け取る */
  const { data: thanks_cards, error } = useSWR<ThanksCardPayload[]>(
    "/api/thanks_card",
    fetcher
  );

  if (error) return <div>An error has occurred.</div>;
  if (!thanks_cards) return <div>Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>title</TableCell>
            <TableCell>body</TableCell>
            <TableCell>from</TableCell>
            <TableCell>to</TableCell>
            <TableCell>createdAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* thanks_cards 全件をテーブル出力する */}
          {thanks_cards?.map((thanks_card: ThanksCardPayload) => {
            return (
              /* 一覧系の更新箇所を特定するために一意となる key を設定する必要がある */
              <TableRow key={thanks_card.id}>
                <TableCell>{thanks_card.id}</TableCell>
                <TableCell>{thanks_card.title}</TableCell>
                <TableCell>{thanks_card.body}</TableCell>
                <TableCell>{thanks_card.from.name}</TableCell>
                <TableCell>{thanks_card.to.name}</TableCell>
                <TableCell>{thanks_card.createdAt?.toString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThanksCardList;