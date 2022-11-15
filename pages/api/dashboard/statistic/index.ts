// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { addStatistic, getAllStatistics, getStatisticById, updateStastic } from "src/db/queries/statistic";
import { IStatistic } from "src/interfaces/IStatistic";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const data = await excuteQuery({
        query: getAllStatistics,
      });
      res.status(200).json({
        data,
      });
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  })
  .post(async (req, res) => {
    try {
      const { ...resource }:IStatistic = req.body;
      await excuteQuery({
        query: addStatistic,
        values: [
          resource.allAddr,
          resource.checkedAddr,
          resource.rejectedAddr,
          resource.processAddr,
          resource.allReq,
          resource.checkedReq,
          resource.processReq
        ],
      });
      return res.status(200).json({ message: "was successfully added" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .patch(async (req, res) => {
    try {
     
      const { ...resource }:IStatistic = req.body;
      let data: any = await excuteQuery({
        query: getStatisticById,
        values: [resource.id],
      });

      if (data.length === 0) {
        return res.status(404).end("Statistic not found");
      }
      await excuteQuery({
        query: updateStastic,
        values: [
          resource.allAddr,
          resource.checkedAddr,
          resource.rejectedAddr,
          resource.processAddr,
          resource.allReq,
          resource.checkedReq,
          resource.processReq,
          resource.id,
        ],
      });
      return res.status(200).json({ message: "was successfully edited" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
