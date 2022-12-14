import { FC, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import s from './index.module.scss';

import { useTranslation } from "next-i18next";

import { Container } from "@/components/common/container/Container";
import { Language } from "@/components/common/header/language_select/Language";

import { headerTopLinks } from "assets/constants/header_links";
import { useDispatch, useSelector } from "react-redux";

import { setIsOpenMenu } from "assets/redux/slices/sidebarMenu";
import { useGetMenu } from "assets/hooks/fetching/useGetMenu";


import { RootState } from "assets/redux/store";
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { ViewSelect } from "./view_select/VIewSelect";



export const Header: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const { push } = useRouter();


    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState(false);
    const [blockLink, setBlockLink] = useState<number | null>(null);

    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    const { menu } = useGetMenu();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            val: "",
        },
        onSubmit: async (values) => {
            await push(`/search_result/${values.val}`);

        },
    });


    const handleBlockLink = (value: number) => {
        return () => {
            setBlockLink(value);
        };
    };

    const handleMouseOverMenu = useCallback((value: number) => {
        return () => {
            setActiveMenu(true);
            setHoverValue(value);
        };
    }, []);

    const handleMouseOutMenu = useCallback(() => {
        return () => setActiveMenu(false);
    }, []);

    const handleSearch = useCallback((val: boolean) => {
        return () => setSearchInput(val);
    }, []);

    const menuVal = useCallback((val: typeof menu) => {
        return val && val[hoverValue ? hoverValue - 1 : 0];
    }, [hoverValue]);



    return <header className={`${s.header} ${bigFont ? s.bigFont : ""}`}>
        <Container>
            <div className={s.h_inner}>
                <div className={s.h_top}>
                    {
                        headerTopLinks.map(({ id, text, link }) => {
                            return id === 5 ? <a href={link} className={s.h_top_links} key={id}>{t(text)}</a> : <Link href={link} key={id}>
                                <a className={s.h_top_links} >{t(text)}</a>
                            </Link>;
                        })
                    }

                    <ViewSelect />
                    <Language />


                </div>
                <div className={s.h_bottom}>
                    <div className={s.setting_language_res}>
                        <Language />
                        <ViewSelect />
                    </div>


                    <Link href={"/"}>
                        <a >
                            <div className={s.logo}>
                                <div className={s.logo_wrapper}> <Image src={'/images/common/logo.svg'} layout={"fill"} objectFit={"contain"} alt="logo" /></div>
                            </div>
                        </a>
                    </Link>



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
                                        item.id === 2 && <a key={item.id} className={s.h_bot_main_link} href="https://www.uzedu.uz/ru/documents/categories">{t(`header:${item.name}`)}</a>

                                    }
                                </div>;
                            })
                        }
                    </div>

                    <div className={s.burger_search_wrap}>
                        <div className={`${s.search} ${!searchInput ? s.not_active_form : ""}`}>
                            <form className={`${s.search_form} ${searchInput ? s.active_form : ""}`} onSubmit={formik.handleSubmit}>
                                <div className={s.search_form_img_left}>
                                    <Image src={"/images/header/search.svg"} layout={"fill"} alt="search" />
                                </div>

                                <input
                                    type="text"
                                    name={"val"}
                                    value={formik.values.val}
                                    onChange={formik.handleChange}
                                    autoComplete="on"
                                />

                                <div className={`${s.search_form_img_right}  ${searchInput ? s.active_search_close : ""}`}>
                                    <Image src={"/images/header/close_search.svg"} layout={"fill"} alt="close"
                                        onClick={handleSearch(false)} />
                                </div>
                            </form>

                            <Image src={"/images/header/search.svg"} width={17} height={17} alt="search"
                                onClick={handleSearch(true)} />

                        </div>
                        <div className={s.burger} onClick={() => dispatch(setIsOpenMenu(true))}>
                            <Image src={"/images/header/burger.svg"} width={23} height={17} alt="menu" />
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

                                {
                                    item?.pageLink ? <a href={`https://${item.pageLink}`} className={s.h_bot_sublink_a} >
                                        {t(`header:${item.name}`)}
                                    </a> : <Link
                                        href={item.name === "contacts" ? "/contacts" :
                                            `${item.name === "gallery" ? "/gallery_photos"
                                                :
                                                item.name === "videogallery" ? "/gallery_video"
                                                    :
                                                    item.typeOfForm === "PEOPLE" ? "/people_page" :
                                                        item.typeOfForm === "INFO" ? "/info_page" :
                                                            "/sub_pages"}/${menuVal(menu)?.name}/${menuVal(menu)?.id}/${item.name}/${item.id}/${item.typeOfForm === "INFO" ? "1" : ""}`

                                        }>
                                        <a className={`${s.h_bot_sublink_a} ${blockLink === item.id ? s.blockLink : ""}`} onClick={handleBlockLink(item.id)} >
                                            {t(`header:${item.name}`)}
                                        </a>
                                    </Link>

                                }

                            </li>;
                        })
                        }
                    </ul>
                </Container>
            </div>
        }

    </header >;
};