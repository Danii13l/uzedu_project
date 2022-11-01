import React, {FC, useState} from "react";

import s from "./index.module.scss";

import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {Exit} from "@/components/common/exit/Exit";

const links = [
    {

        id: 1, text: "Министерство", subref: [
            {id: 1, ref: "/admin/ministry/about", text: "О Министерстве"},
            {id: 2, ref: "/admin/ministry/leaders", text: "Руководство"},
        ]
    },
    {
        id: 2, text: "Документы", subref: []
    },
    {
        id: 3, text: "Образование", subref: [
            {id: 1, ref: "/admin/education/statistics", text: "Статистика"},
            {id: 2, ref: "/admin/education/analyticaldata", text: "Аналитические данные"},
        ]
    },
    {
        id: 4, text: "Деятельность", subref: [
            {id: 1, ref: "/admin/activities/registerserv", text: "Реестр государственных услуг"},
            {id: 2, ref: "/admin/activities/projecte", text: "Проект \"Электронное правительство\""},
        ]
    },
    {
        id: 5, text: "Информационная служба", subref: [
            {id: 1, ref: "/admin/informationService/ministrynews", text: "Новости министерства"},
            {id: 2, ref: "/admin/informationService/pressreleases", text: "Пресс-релизы"},
        ]
    },
    {
        id: 6, text: "Открытые данные", subref: [
            {id: 1, ref: "/admin/opendata/openbudget", text: "Открытый бюджет"},
            {id: 2, ref: "/admin/opendata/opendatadp", text: "Открытые данные (УП-6247)"},
        ]
    },
];

interface HeaderLinksInt {
    headerLinks?: { ref: string; text: string }[];
    active?: number;
    children: React.ReactNode;
}

export const AdminLayout: FC<HeaderLinksInt> = ({
                                                    headerLinks,
                                                    active,
                                                    children,
                                                }): JSX.Element => {
    const {pathname} = useRouter();

    const [activePage, setActivePage] = useState(1);

    const handleActivePage = (num: number) => {
        return () => setActivePage(num);
    };

    return (
        <>
            <Head>
                <title>{"hello"}</title>
            </Head>
            <div className={s.layout}>
                <div className={s.navbar}>
                    <Link href={"/"}>
                        <a className={s.logo}>
                            <Image src={"/images/common/logo.svg"} width={80} height={80}/>
                        </a>
                    </Link>
                    {/*{*/}
                    {/*    links.map(item => {*/}
                    {/*        return <Link href={item.link} key={item.id}>*/}
                    {/*            <a className={`${s.links} ${pathname === item.link ? s.active : ""}`}>*/}

                    {/*            /!*<span className={s.links_img_wrapper}>*!/*/}
                    {/*            /!*    <Image src={item.img} layout={"fill"} objectFit={"cover"}/>*!/*/}
                    {/*            /!*</span>*!/*/}

                    {/*                <span>{item.text}</span>*/}
                    {/*            </a>*/}
                    {/*        </Link>*/}
                    {/*    })*/}
                    {/*}*/}
                </div>
                <div className={s.content}>
                    <div className={s.content_top}>
                        <p className={s.content_top_text}>{"helllo"}</p>

                        <Exit/>
                    </div>
                    <div className={s.content_inner}>
                        {children}
                    </div>
                </div>
            </div>
        </>);
};
