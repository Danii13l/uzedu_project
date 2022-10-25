import {FC, useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

import s from './index.module.scss';

import {useTranslation} from "next-i18next";

import {Container} from "@/components/common/container/Container";
import {Language} from "@/components/common/header/language_select/Language";


import {setBAndW} from "assets/redux/slices/blackWhite";

import {headerBottomLinks, headerTopLinks} from "assets/constants/header_links";

import {useDispatch, useSelector} from "react-redux";
import {setIsOpenMenu} from "assets/redux/slices/sidebarMenu";


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
    };

    const handleBlackAndWhite = useCallback((val: boolean) => {
        return () => dispatch(setBAndW(val));
    }, []);

    const handleSettingView = useCallback(() => {
        return setSettingView(prev => !prev);
    }, []);


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
                            </Link>;
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
                    <div className={s.setting_language_res}>
                        <Language/>
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

                    </div>

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
                                                setActiveMenu(true);
                                                setHoverValue(item.id);
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
                                </div>;
                            })
                        }
                    </div>

                    <div className={s.burger_search_wrap}>
                        <div className={`${s.search} ${!searchInput ? s.not_active_form : ""}`}>
                            <form className={`${s.search_form} ${searchInput ? s.active_form : ""}`}>
                                <div className={s.search_form_img_left}>
                                    <Image src={"/images/header/search.svg"} layout={"fill"}/>
                                </div>

                                <input type={"text"} placeholder={"Поиск"}/>
                                <div className={s.search_form_img_right}>
                                    <Image src={"/images/header/close_search.svg"} layout={"fill"}
                                           onClick={handleSearch(false)}/>
                                </div>
                            </form>

                            <Image src={"/images/header/search.svg"} width={17} height={17}
                                   onClick={handleSearch(true)}/>

                        </div>
                        <div className={s.burger} onClick={() => dispatch(setIsOpenMenu(true))}>
                            <Image src={"/images/header/burger.svg"} width={23} height={17}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

        {
            <div className={`${s.sublinks_wrap} ${activeMenu ? s.sublinks_wrap_active : ""}`}
                 onMouseOver={() => setActiveMenu(true)}
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
                            </li>;
                        })
                        }
                    </ul>
                </Container>
            </div>
        }

    </header>;
};