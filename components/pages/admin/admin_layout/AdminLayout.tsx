import React, {FC, useState} from "react";

import s from "./index.module.scss";

import {useRouter} from "next/router";
import Link from "next/link";

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
        <div className={s.layout}>
            <aside className={s.aside}>

                {
                    links.map(item => {
                        return <div key={item.text} className={s.links_wrapper}>
                            <p className={s.page_name} onClick={handleActivePage(item.id)}>{item.text}</p>
                            <div className={activePage === item.id ? "" : s.not_active}>
                                {
                                    item.subref.map(subitems => {
                                        return <Link key={subitems.text} href={subitems.ref}><a
                                            className={s.page_link}>{subitems.text}</a></Link>;
                                    })
                                }
                            </div>
                        </div>;
                    })

                }

            </aside>

            <div className={s.content}>{children}</div>
        </div>
    );
};
