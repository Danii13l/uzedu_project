// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { IncomingForm } from "formidable";
import { isAuth } from "src/utils/auth";
import { RemoveImage, uploadImage } from "src/utils/upload";
const handler = nc<NextApiRequest, NextApiResponse>();
export const config = {
  api: {
    bodyParser: false,
  },
};
handler
  .use(isAuth)
  .post(async (req, res) => {
    try {
      const data: any = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
      const { image } = data.files;
      if (!image) {
        res.status(400).json({ message: "image required" });
      }
      const path = await uploadImage(image);
      return res.status(200).json({ url: path });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .put(async (req, res) => {
    try {
      const data: any = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
      const { url } = data.fields;
      await RemoveImage(url);
      return res.status(200).json({ message: "was successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
