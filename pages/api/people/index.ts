// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import formidable from "formidable";

import { getById, updatePage } from "src/db/queries/page";
import {
  getAllByType,
  getAllByTypeEn,
  getAllByTypeRu,
  getAllByTypeUz,

} from "src/db/queries/people";

handler
  .get(async (req, res) => {
    try {
      const { lang, type } = req.query;
      let pages: any = await excuteQuery({
        query:
          lang === "ru"
            ? getAllByTypeRu
            : lang === "uz"
            ? getAllByTypeUz
            : lang === "en"
            ? getAllByTypeEn
            : getAllByType,
        values: [type],
      });
      pages = JSON.parse(JSON.stringify(pages));

      pages.map((p: any) => {
        p.workHistory = JSON.parse(p.workHistory);
        p.duty = JSON.parse(p.duty);
      });

      for (const p of pages) {
        for (const w of p.workHistory) {
          if (w.text && lang) {
            w.text = lang === "ru" ? w.textRu : lang === "uz" ? w.textUz : w.text;
            delete w.textRu;
            delete w.textUz;
          }
        }
        for (const w of p.duty) {
          if (w.text && lang) {
            w.text = lang === "ru" ? w.textRu : lang === "uz" ? w.textUz : w.text;
            delete w.textRu;
            delete w.textUz;
          }
        }
      }
      const page = pages[0];
      res.status(200).json({
        page,
      });
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  });

export default handler;
