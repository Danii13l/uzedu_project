import { FC, useEffect, useState } from "react";
import Link from "next/link";
import ReactDOM from "react-dom";

import s from "./index.module.scss";

import { useTranslation } from "next-i18next";

import { Container } from "@/components/common/container/Container";

import { headerBottomLinksSidebar, headerTopLinks } from "assets/constants/header_links";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "assets/redux/store";
import { setIsOpenMenu } from "assets/redux/slices/sidebarMenu";
import { useGetMenu } from 'assets/hooks/fetching/useGetMenu';


export const SidebarMenu: FC = (): JSX.Element | null => {

    const [isBrowser, setIsBrowser] = useState<boolean>(false);
    const { t } = useTranslation();

    const { menu } = useGetMenu();

    const { isOpen } = useSelector(({ sidebarMenu }: RootState) => sidebarMenu);


    const dispatch = useDispatch();


    useEffect(() => {
        setIsBrowser(true);
    }, []);


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    });


    if (isBrowser) {
        return ReactDOM.createPortal(
            <div className={`${s.sidebar_menu} ${isOpen ? s.active : ""}`}>
                <Container>
                    <div className={s.sidebar_inner}>
                        <div className={s.sidebar_link_top_wr}>
                            <div className={s.sidebar_links_top_box}>
                                {
                                    headerTopLinks.map(item => {
                                        return <Link href={item.link} key={item.id}>
                                            <a className={s.sidebar_top_links}>{t(item.text)}</a>
                                        </Link>;
                                    })
                                }
                            </div>
                            <div className={s.close} onClick={() => dispatch(setIsOpenMenu(false))}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="12" fill="#E9EBF2" />
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M8.25 7.75L7.75 8.25L11.5 12L7.75 15.75L8.25 16.25L12 12.5L15.75 16.25L16.25 15.75L12.5 12L16.25 8.25L15.75 7.75L12 11.5L8.25 7.75Z"
                                        fill="#192640" />
                                </svg>
                            </div>
                        </div>

                        <div className={s.sidebar_link_bottom_wr}>


                            {menu && menu.map(item => {
                                return <div key={item.id} className={s.sidebar_link_bottom_item}>

                                    {
                                        item.id !== 2 ?
                                            <h5 className={s.sidebar_bottom_links_main}>
                                                {t(`header:${item.name}`)}
                                            </h5>
                                            :
                                            <Link href={`/sub_pages/${item.name}`}>
                                                <a className={s.sidebar_bottom_links_main}>{t(`header:${item.name}`)}</a>
                                            </Link>
                                    }



                                    <div className={s.sidebar_link_bottom_subitem}>
                                        {
                                            item.subMenu.map(subitem => {
                                                return <Link key={subitem.id} href={
                                                    `${item.name === "gallery" ? "/gallery_photos"
                                                        :
                                                        item.name === "videogallery" ? "/gallery_video"
                                                            :
                                                            subitem.typeOfForm === "PEOPLE" ? "/people_page" :
                                                                subitem.typeOfForm === "INFO" ? "/info_page" :
                                                                    "/sub_pages"}/${subitem?.name}/${subitem?.id}/${item.name}/${item.id}`

                                                }>
                                                    <a className={s.sidebar_bottom_links} onClick={() => dispatch(setIsOpenMenu(false))} >
                                                        {t(`header:${subitem.name}`)}
                                                    </a>
                                                </Link>;
                                            })
                                        }
                                    </div>
                                </div>;
                            })
                            }
                        </div>
                    </div>

                </Container>
            </div>,
            document.getElementById("sidebar_menu") as HTMLElement
        );
    }
    return null;
};

SidebarMenu.displayName = "SidebarMenu";
