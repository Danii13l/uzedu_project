// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { getMenu, getSubMenu } from "src/db/queries/menu";
import { ISubMenu } from "src/interfaces/ISubMenu";
import { IMenu } from "src/interfaces/IMenu";
const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    let menu: any = await excuteQuery({
      query: getMenu,
    });
    let subMenu: any = await excuteQuery({
      query: getSubMenu,
    });

    menu.forEach((m: IMenu) => {
      const subMenuArray: ISubMenu[] = [];
      subMenu.forEach((s: any) => {
        if (m.id === s.menuId) {
            subMenuArray.push({id:s.id,name:s.name,typeOfForm:s.typeOfForm, pageLink:s.pageLink});
        }
      });
      m.subMenu = subMenuArray;
    });

    res.status(200).json({
      menu,
    });
  } catch (err: any) {

    res.status(500).json({ message: err });
    return;
  }
});

export default handler;
