import React, { FC, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import s from "./index.module.scss";

import { Exit } from "@/components/common/exit/Exit";

import { useGetMenu } from "assets/hooks/fetching/useGetMenu";
import { useTranslation } from "next-i18next";


export const AdminLayout: FC<{ children: React.ReactNode; namePage: string; subNamePage: string | null }> = ({
    children,
    namePage,
    subNamePage
}): JSX.Element => {
    const { menu } = useGetMenu();

    const [activeMenu, setActiveMenu] = useState(0);
    const { t } = useTranslation();

    const handleActivePage = (num: number) => {
        return () => setActiveMenu(num);
    };

    return (
        <>
            <Head>
                <title>{"hello"}</title>
            </Head>
            <div className={s.layout}>
                <div className={s.navbar}>
                    <Link href={"/admin"}>
                        <a className={s.logo}>
                            <Image src={"/images/common/logo.svg"} width={80} height={80} alt={"logo"} />
                        </a>
                    </Link>

                    <div className={`${s.home_link} ${activeMenu === 0 ? s.active : ""}`} onClick={handleActivePage(0)}>
                        <h6 className={s.menu_title} onClick={handleActivePage(0)}>
                            {t(`admin:homepage`)}
                        </h6>
                        <ul>
                            {
                                ["HOMEBANNER", "HOMESLIDER", "HOMEOPINIONS", "HOMESTATISTIC", "HOMELINKS"].map((item, index) => {
                                    return <Link href={`/admin/pages/home_page/0/${item.toLowerCase()}/${index}/${item}`} key={item}>
                                        <a className={s.menu_links}>{item}</a>
                                    </Link>;
                                })
                            }
                        </ul>
                    </div>

                    {
                        menu && menu.map(item => {
                            return <div className={`${s.menu_item}  ${activeMenu === item.id ? s.active : ""}`}
                                key={item.id}>

                                <h6 className={s.menu_title} onClick={handleActivePage(item.id)}>
                                    {t(`header:${item.name}`)}
                                </h6>
                                <ul className={`${s.menu_list}  ${activeMenu === item.id ? s.active : ""}`}>
                                    {
                                        item.subMenu.map(subitem => {
                                            return <li key={subitem.id} onClick={handleActivePage(item.id)}>
                                                <Link
                                                    href={`/admin/pages/${item.name}/${item.id}/${subitem.name}/${subitem.id}/${subitem?.typeOfForm}`}>
                                                    <a className={s.menu_links}>{t(`header:${subitem.name}`)}</a>
                                                </Link>
                                            </li>;
                                        })
                                    }
                                </ul>
                            </div>;
                        })
                    }
                </div>

                <div className={s.content}>
                    <div className={s.content_top}>
                        <p className={s.content_top_text}>
                            <span>{namePage}</span>
                            {subNamePage && <span className={s.subname}>{subNamePage}</span>}
                        </p>
                        <Exit />
                    </div>
                    <div className={s.content_inner}>
                        {children}
                    </div>
                </div>
            </div>
        </>);
};
