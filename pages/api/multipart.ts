// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
const handler = nc<NextApiRequest, NextApiResponse>();
import {
  getBannerQuery,
  getEnBanerQuery,
  getEnLinkQuery,
  getEnSliderQuery,
  getLinkQuery,
  getRuBannerQuery,
  getRuLinkQuery,
  getRuSliderQuery,
  getSliderQuery,
  getUzBannerQuery,
  getUzLinkQuery,
  getUzSliderQuery,
} from "src/db/queries/multipart";
import { IMultipartType } from "src/interfaces/IMultipartType";
handler.get(async (req, res) => {
  try {
    const { lang, type } = req.query;
    let data = null;
    let query = null;
    switch (type) {
      case IMultipartType.banner:
        query =
          lang === "ru"
            ? getRuBannerQuery
            : lang === "uz"
            ? getUzBannerQuery
            : lang === "en"
            ? getEnBanerQuery
            : getBannerQuery;
        break;
      case IMultipartType.slider:
        query =
          lang === "ru"
            ? getRuSliderQuery
            : lang === "uz"
            ? getUzSliderQuery
            : lang === "en"
            ? getEnSliderQuery
            : getSliderQuery;
        break;
      case IMultipartType.link:
        query =
          lang === "ru"
            ? getRuLinkQuery
            : lang === "uz"
            ? getUzLinkQuery
            : lang === "en"
            ? getEnLinkQuery
            : getLinkQuery;
        break;
      default:
        break;
    }
    data = await excuteQuery({
      query: query,
    });
    res.status(200).json({
      data,
    });
  } catch (err: any) {
    res.status(500).json({ message: err });
    return;
  }
});

export default handler;
