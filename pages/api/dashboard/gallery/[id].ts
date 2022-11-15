// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import { deleteById, getGalaryById } from "src/db/queries/gallery";
import { RemoveImage } from "src/utils/upload";

handler.use(isAuth).delete(async (req, res) => {
  try {
    const id = req.query.id;
    let pages: any = await excuteQuery({
      query: getGalaryById,
      values: [id],
    });
    if (pages.length === 0) {
      return res.status(404).end("Galary not found");
    }
    let images = JSON.parse(JSON.stringify(pages[0].images));
    images = JSON.parse(images);

    await excuteQuery({
      query: deleteById,
      values: [id],
    }).then(() => {
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const url = "public" + images[i].url;
          RemoveImage(url);
        }
      }
    });
    return res.status(200).json({ message: "was successfully removed" });
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }

}).get(async (req, res) => {
  try {

    const id = req.query.id;
    let gallery: any = await excuteQuery({
      query: getGalaryById,
      values: [id],
    });
    if (gallery.length === 0) {
      return res.status(404).end("Galary not found");
    }
    await gallery.map(async (p: any) => {
      p.images = JSON.parse(p.images);
    });

    
    return res.json(gallery[0])
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
});


export default handler;
