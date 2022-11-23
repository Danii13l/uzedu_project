// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import formidable from "formidable";

import { getById, updatePage } from "src/db/queries/page";
import {
  addPeople,
  getAllById,
  getAllByType,
  getAllByTypeEn,
  getAllByTypeRu,
  getAllByTypeUz,
  updatePeople,
} from "src/db/queries/people";
import { RemoveImage, uploadImage } from "src/utils/upload";
export const config = {
  api: {
    bodyParser: false,
  },
};
handler
  .use(isAuth)
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
     
      
      res.status(200).json({
        pages,
      });
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  })
  .post(async (req, res) => {
    const form = formidable();
    const data: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const { image } = data.files;
    const imagePath = await uploadImage(image);
    const {
      type,
      name,
      nameRu,
      nameUz,
      position,
      positionRu,
      positionUz,
      workHours,
      workHoursRu,
      workHoursUz,
      phone,
      email,
      tg,
      biography,
      biographyRu,
      biographyUz,
      workHistory,
      duty,
      isBoss,
    } = data.fields;
    try {
      await excuteQuery({
        query: addPeople,
        values: [
          type,
          name,
          nameRu,
          nameUz,
          position,
          positionRu,
          positionUz,
          workHours,
          workHoursRu,
          workHoursUz,
          phone,
          email,
          tg,
          biography,
          biographyRu,
          biographyUz,
          JSON.parse(JSON.stringify(workHistory)),
          JSON.parse(JSON.stringify(duty)),
          isBoss,
          imagePath,
        ],
      });
      return res.status(200).json({ message: "was successfully added" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .put(async (req, res) => {
    const form = formidable();
    const data: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const { image } = data.files;
     
    const {
      id,
      type,
      name,
      nameRu,
      nameUz,
      position,
      positionRu,
      positionUz,
      workHours,
      workHoursRu,
      workHoursUz,
      phone,
      email,
      tg,
      biography,
      biographyRu,
      biographyUz,
      workHistory,
      duty,
      isBoss,
    } = data.fields;
    
    try {
      let pages: any = await excuteQuery({
        query: getAllById,
        values: [id],
      });
      if (pages.length === 0) {
        return res.status(404).end("Page not found");
      }
      let imagePath = pages[0].url;
      if (image) {
        const url = "public" + imagePath;
        RemoveImage(url);
        imagePath = await uploadImage(image);
      }
      await excuteQuery({
        query: updatePeople,
        values: [
          type,
          name,
          nameRu,
          nameUz,
          position,
          positionRu,
          positionUz,
          workHours,
          workHoursRu,
          workHoursUz,
          phone,
          email,
          tg,
          biography,
          biographyRu,
          biographyUz,
          JSON.parse(JSON.stringify(workHistory)),
          JSON.parse(JSON.stringify(duty)),
          isBoss,
          imagePath,
          id,
        ],
      });
      return res.status(200).json({ message: "was successfully edited" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
