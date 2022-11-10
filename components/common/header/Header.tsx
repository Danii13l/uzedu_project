import {FC, useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

import s from './index.module.scss';

import {useTranslation} from "next-i18next";

import {Container} from "@/components/common/container/Container";
import {Language} from "@/components/common/header/language_select/Language";

import {headerTopLinks} from "assets/constants/header_links";
import {useDispatch} from "react-redux";

import {setBAndW} from "assets/redux/slices/blackWhite";
import {setIsOpenMenu} from "assets/redux/slices/sidebarMenu";
import {useGetMenu} from "assets/hooks/fetching/useGetMenu";


export const Header: FC = (): JSX.Element => {
    const {t} = useTranslation();

    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState(false);
    const [settingView, setSettingView] = useState(false);

    const {menu} = useGetMenu();

    const dispatch = useDispatch();

    const handleMouseOverMenu = useCallback((value: number) => {
        return () => {
            setActiveMenu(true);
            setHoverValue(value);
        }
    }, []);

    const handleMouseOutMenu = useCallback(() => {
        return () => setActiveMenu(false);
    }, []);

    const handleSearch = useCallback((val: boolean) => {
        return () => setSearchInput(val);
    }, []);

    const handleBlackAndWhite = useCallback((val: boolean) => {
        return () => dispatch(setBAndW(val));
    }, []);

    const handleSettingView = useCallback(() => {
        return setSettingView(prev => !prev);
    }, []);


    const menuVal = useCallback((val: typeof menu) => {
        return val && val[hoverValue ? hoverValue - 1 : 0]
    }, [hoverValue]);


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
                        <Link href={"/"}>
                            <a className={s.logo_wrapper}>
                                <Image src={'/images/common/logo.svg'} layout={"fill"} objectFit={"cover"}/>
                            </a>
                        </Link>
                    </div>


                    <div className={s.h_bot_main_links_wrap}>
                        {
                            menu && menu.map(item => {
                                return <div key={item.id}

                                            className={s.h_bot_main_link_wrap}>
                                    {
                                        item.id !== 2 && <>
                                            <p onMouseOver={handleMouseOverMenu(item.id)}
                                               onMouseLeave={handleMouseOutMenu()}
                                               className={s.h_bot_main_link}>{t(`header:${item.name}`)}

                                                {
                                                    hoverValue && <span className={s.h_bot_main_link_active}></span>
                                                }
                                            </p>
                                        </>
                                    }

                                    {
                                        item.id === 2 && <Link href={`/sub_pages/${item.name}`}>
                                            <a className={s.h_bot_main_link}>{t(`header:${item.name}`)}</a>
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
                        {menu && menuVal(menu)?.subMenu.map((item) => {
                            return <li key={item.id} className={s.h_bot_sublink_li} onClick={handleMouseOutMenu()}>
                                <Link
                                    href={`/sub_pages/${menuVal(menu)?.name}/${menuVal(menu)?.id}/${item.name}/${item.id}`}>
                                    <a className={s.h_bot_sublink_a} >
                                        {t(`header:${item.name}`)}
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