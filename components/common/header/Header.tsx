import {FC, useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

import s from './index.module.scss';

import {useTranslation} from "next-i18next";

import {Container} from "@/components/common/container/Container";
import {Language} from "@/components/common/header/language_select/Language";
import {useDispatch, useSelector} from "react-redux";

import {setBAndW} from "assets/redux/slices/blackWhite";


const headerTopLinks = [
    {
        id: 1,
        text: "header:vacancies",
        link: "#"
    },
    {
        id: 2,
        text: "header:projects",
        link: "#"
    },
    {
        id: 3,
        text: "header:faq",
        link: "#"
    },
    {
        id: 4,
        text: "header:statesymbol",
        link: "#"
    },
    {
        id: 5,
        text: "header:addressofcitizen",
        link: "#"
    }];


const headerBottomLinks = [
    {
        id: 1, text: "header:ministry", link: "#", sublinks: [
            {id: 1, text: "header:aboutminstry", link: "#"},
            {id: 2, text: "header:leaders", link: "#"},
            {id: 3, text: "header:centraloffice", link: "#"},
            {id: 4, text: "header:teradmin", link: "#"},
            {id: 5, text: "header:suborgan", link: "#"},
            {id: 6, text: "header:coorвadvbodies", link: "#"},
            {id: 7, text: "header:structurecentmin", link: "#"},
            {id: 8, text: "header:requisites", link: "#"},
            {id: 9, text: "header:goals", link: "#"},
            {id: 10, text: "header:contacts", link: "#"},
        ]
    },
    {
        id: 2, text: "header:documents", link: "#", sublinks: []
    },
    {
        id: 3, text: "header:education", link: "#", sublinks: [
            {id: 1, text: "header:statistics", link: "#"},
            {id: 2, text: "header:analyticaldata", link: "#"},
            {id: 3, text: "header:elibrary", link: "#"},
            {id: 4, text: "header:Approximaterecommen", link: "#"},
            {id: 5, text: "header:Childcenter", link: "#"},
            {id: 6, text: "header:disabilities", link: "#"},
        ]
    },
    {
        id: 4, text: "header:performance", link: "#", sublinks: [
            {id: 1, text: "header:registerserv", link: "#"},
            {id: 2, text: "header:projecte", link: "#"},
            {id: 3, text: "header:fightingcor", link: "#"},
            {id: 4, text: "header:actionstrategy", link: "#"},
            {id: 5, text: "header:genderequality", link: "#"},
            {id: 6, text: "header:tenders", link: "#"},
            {id: 7, text: "header:workplan", link: "#"},
            {id: 8, text: "header:shedulemeetings", link: "#"},
            {id: 9, text: "header:checkingactivities", link: "#"},
            {id: 10, text: "header:reports", link: "#"},
            {id: 11, text: "header:investmentpotential", link: "#"},
            {id: 12, text: "header:Workwithapplications", link: "#"},
        ]
    },
    {
        id: 5, text: "header:informationService", link: "#", sublinks: [
            {id: 1, text: "header:ministrynews", link: "#"},
            {id: 2, text: "header:pressreleases", link: "#"},
            {id: 3, text: "header:massmediaaboutus", link: "#"},
            {id: 4, text: "header:logobrandguide", link: "#"},
            {id: 5, text: "header:gallery", link: "#"},
            {id: 6, text: "header:videogallery", link: "#"},
            {id: 7, text: "header:pressconference", link: "#"},
            {id: 8, text: "header:pressservice", link: "#"},
            {id: 9, text: "header:assistance", link: "#"},
            {id: 10, text: "header:сonferences", link: "#"},
            {id: 11, text: "header:contests", link: "#"},
            {id: 12, text: "header:accreditation", link: "#"},
            {id: 13, text: "header:Opennessministry", link: "#"},
            {id: 14, text: "header:statements", link: "#"},
            {id: 15, text: "header:infographics", link: "#"},
        ]
    },
    {
        id: 6, text: "header:opendata", link: "#", sublinks: [
            {id: 1, text: "header:openbudget", link: "#"},
            {id: 2, text: "header:opendataDP", link: "#"},
            {id: 3, text: "header:setofopendata", link: "#"},
        ]
    },

]

export const Header: FC = (): JSX.Element => {
    const {t} = useTranslation();

    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState(false);
    const [settingView, setSettingView] = useState(false);


    const dispatch = useDispatch();

    const handleMouseOverIndex = useCallback((value: number) => {
        return () => setHoverValue(value);
    }, []);

    const handleMouseOver = useCallback(() => {
        return () => setActiveMenu(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        return () => setActiveMenu(false);
    }, []);

    const handleSearch = (val: boolean) => {
        return () => setSearchInput(val);
    }

    const handleBlackAndWhite = useCallback((val: boolean) => {
        return () => dispatch(setBAndW(val));
    }, [])

    const handleSettingView = useCallback(() => {
        return setSettingView(prev => !prev);
    }, [])


    useEffect(() => {
        document.addEventListener("click", (ev: any) => {
            if (!ev.target.dataset.setview) setSettingView(false);

        });
    }, []);

    return <header className={s.header}>
        <Container>
            <div className={s.h_inner}>
                <div className={s.h_top}>
                    {
                        headerTopLinks.map(({id, text, link}) => {
                            return <Link href={link} key={id}>
                                <a className={s.h_top_links}>{t(text)}</a>
                            </Link>
                        })
                    }

                    <div className={s.setting} data-setview={"setting_view"}>
                        <Image data-setview={"setting_view"} src={"/images/header/eye.svg"} width={18} height={12}
                               onClick={handleSettingView}/>

                        {settingView && <div className={s.s_inner} data-setview={"setting_view"}>
                            <div className={s.s_item} data-setview={"setting_view"}>
                                <p data-setview={"setting_view"}>Вид:</p>
                                <div className={s.s_item_inner} data-setview={"setting_view"}>
                                    <div onClick={handleBlackAndWhite(false)} data-setview={"setting_view"}>A</div>
                                    <div onClick={handleBlackAndWhite(true)} data-setview={"setting_view"}>A</div>
                                </div>
                            </div>
                            <div className={`${s.s_item} ${s.s_item_font}`} data-setview={"setting_view"}>
                                <p data-setview={"setting_view"}>Размер шрифта:</p>
                                <div className={s.s_item_inner} data-setview={"setting_view"}>
                                    <div data-setview={"setting_view"}>A</div>
                                    <div data-setview={"setting_view"}>A</div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>

                    <Language/>
                </div>
                <div className={s.h_bottom}>
                    <div className={s.logo}>
                        <div className={s.logo_wrapper}><Image src={'/images/common/logo.svg'} layout={"fill"}
                                                               objectFit={"cover"}/></div>
                    </div>

                    <div className={s.h_bot_main_links_wrap}>
                        {
                            headerBottomLinks.map(item => {
                                return <div key={item.id}

                                            className={s.h_bot_main_link_wrap}>
                                    {
                                        item.id !== 2 && <>
                                            <p onMouseOver={() => {
                                                setActiveMenu(true)
                                                setHoverValue(item.id)
                                            }
                                            }

                                               onMouseLeave={handleMouseOut()}
                                               className={s.h_bot_main_link}>{t(item.text)}

                                                {
                                                    hoverValue && <div className={s.h_bot_main_link_active}></div>
                                                }
                                            </p>


                                        </>
                                    }

                                    {
                                        item.id === 2 && <Link href={item.link}>
                                            <a className={s.h_bot_main_link}>{t(item.text)}</a>
                                        </Link>
                                    }


                                </div>
                            })
                        }
                    </div>

                    <div className={s.burger_search_wrap}>
                        <div className={`${s.search} ${!searchInput ? s.not_active_form : ""}`}>
                            <form className={`${s.search_form} ${searchInput ? s.active_form : ""}`}>
                                <input type={"text"} placeholder={"Поиск"}/>
                                <div className={s.close_search}>
                                    <Image src={"/images/header/close.svg"} width={12} height={12}
                                           onClick={handleSearch(false)}/>
                                </div>
                            </form>

                            <Image src={"/images/header/search.svg"} width={17} height={17}
                                   onClick={handleSearch(true)}/>


                        </div>
                        <div className={s.burger}>
                            <Image src={"/images/header/burger.svg"} width={23} height={17}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

        {
            activeMenu && <div className={s.sublinks_wrap} onMouseOver={() => setActiveMenu(true)}
                               onMouseLeave={() => setActiveMenu(false)}>
                <Container>
                    <ul className={s.h_bot_sublinks_list}>
                        {headerBottomLinks[hoverValue ? hoverValue - 1 : 0].sublinks.map(item => {
                            return <li key={item.id} className={s.h_bot_sublink_li}>
                                <Link href={item.link}>
                                    <a className={s.h_bot_sublink_a}>
                                        {t(item.text)}
                                    </a>
                                </Link>
                            </li>
                        })
                        }
                    </ul>
                </Container>
            </div>
        }

    </header>
}