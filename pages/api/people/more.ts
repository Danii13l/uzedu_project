// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { getAllById, getAllByIdEn, getAllByIdRu, getAllByIdUz } from "src/db/queries/people";
const handler = nc<NextApiRequest, NextApiResponse>();
handler
  .get(async (req, res) => {
    try {
    const { id, lang } = req.query;
      let people: any = await excuteQuery({
        query:
          lang === "ru"
            ? getAllByIdRu
            : lang === "uz"
            ? getAllByIdUz
            : lang === "en"
            ? getAllByIdEn
            : getAllById,
        values: [id],
      });
      if (people.length === 0) {
        return res.status(404).end("People not found");
      }
      people = JSON.parse(JSON.stringify(people));

      people.map((p: any) => {
        p.workHistory = JSON.parse(p.workHistory);
        p.duty = JSON.parse(p.duty);
      });

      for (const p of people) {
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
      const page = people[0];
      return res.json(people[0]);
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
