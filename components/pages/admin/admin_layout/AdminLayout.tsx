import React, { FC, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import s from "./index.module.scss";

import { Exit } from "@/components/common/exit/Exit";

import { useGetMenu } from "assets/hooks/fetching/useGetMenu";
import { useTranslation } from "next-i18next";
import { footerLinks, headerTopLinks, service } from "assets/constants/admin_links";





export const AdminLayout: FC<{ children: React.ReactNode; namePage: string; subNamePage: string | null }> = ({
    children,
    namePage,
    subNamePage
}): JSX.Element => {
    const { menu } = useGetMenu();

    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const { t } = useTranslation();

    const handleActivePage = (num: number) => {
        return () => setActiveMenu(num);
    };

    return (
        <>
            <Head>
                <title>{"Админ Панель"}</title>
            </Head>


            <div className={s.layout}>
                <div className={s.navbar}>
                    <Link href={"/admin"}>
                        <a className={s.logo}>
                            <Image src={"/images/common/logo.svg"} width={100} height={100} alt={"logo"} />
                        </a>
                    </Link>

                    <div className={`${s.menu_item} ${activeMenu === 0 ? s.active : ""}`} onClick={handleActivePage(0)}>
                        <h6 className={s.menu_title}>
                            {t(`admin:homepage`)}
                        </h6>
                        <ul className={`${s.menu_list}  ${activeMenu === 0 ? s.active : ""}`}>
                            {
                                ["HOMEBANNER", "HOMESLIDER", "HOMEOPINIONS", "HOMESTATISTIC", "HOMELINKS"].map((item, index) => {
                                    return <Link href={`/admin/pages/home_page/0/${item.toLowerCase()}/${index}/${item}`} key={item}>
                                        <a className={s.menu_links} onClick={handleActivePage(0)}>{t(`admin:${item.toLowerCase()}`)}</a>
                                    </Link>;
                                })
                            }
                        </ul>
                    </div>

                    <div className={`${s.menu_item} ${activeMenu === 100 ? s.active : ""}`} onClick={handleActivePage(100)}>
                        <h6 className={s.menu_title} >
                            Услуги
                        </h6>
                        <ul className={`${s.menu_list}  ${activeMenu === 100 ? s.active : ""}`}>
                            {
                                service.map((item) => {
                                    return <Link href={item.link} key={item.id}>
                                        <a className={s.menu_links} onClick={handleActivePage(100)} >{item.text}</a>
                                    </Link>;
                                })
                            }
                        </ul>
                    </div>

                    <div className={`${s.menu_item} ${activeMenu === 200 ? s.active : ""}`} onClick={handleActivePage(200)}>
                        <h6 className={s.menu_title} >
                            Футер
                        </h6>
                        <ul className={`${s.menu_list}  ${activeMenu === 200 ? s.active : ""}`}>
                            {
                                footerLinks.map((item) => {
                                    return <Link href={item.link} key={item.id}>
                                        <a className={s.menu_links} onClick={handleActivePage(200)} >{item.text}</a>
                                    </Link>;
                                })
                            }
                        </ul>
                    </div>

                    <div className={`${s.menu_item} ${activeMenu === 300 ? s.active : ""}`} onClick={handleActivePage(300)}>
                        <h6 className={s.menu_title} >
                            Верхние ссылки
                        </h6>
                        <ul className={`${s.menu_list}  ${activeMenu === 300 ? s.active : ""}`}>
                            {
                                headerTopLinks.map((item) => {
                                    return <Link href={item.link} key={item.id}>
                                        <a className={s.menu_links} onClick={handleActivePage(300)} >{item.text}</a>
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
                                            {
                                                return subitem.typeOfForm !== "LINK" && <li key={subitem.id} onClick={handleActivePage(item.id)}>
                                                    <Link
                                                        href={`/admin/pages/${item.name}/${item.id}/${subitem.name}/${subitem.id}/${subitem?.typeOfForm}`}>
                                                        <a className={s.menu_links}>{t(`header:${subitem.name}`)}</a>
                                                    </Link>
                                                </li>;
                                            }


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
