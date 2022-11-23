import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import s from "./index.module.scss";

import { Container } from "@/components/common/container/Container";

import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { RootState } from "assets/redux/store";


const footerLinks = [
    { id: 1, link: "/sub_pages/footer/200/cookiepolicy/1", text: "footer:cookiepolicy" },
    { id: 2, link: "/sub_pages/footer/200/privacypolicy/2", text: "footer:privacypolicy" },
    { id: 3, link: "/sub_pages/footer/200/termsuse/3", text: "footer:termsuse" },
    { id: 5, link: "https://www.uzedu.uz/ru/static/request", text: "footer:appealscitizens" },
    { id: 6, link: "https://www.uzedu.uz/ru/documents/open-data", text: "footer:opendata" },
];

export const Footer: FC = (): JSX.Element => {
    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    const { t } = useTranslation();
    return <footer className={`${s.footer} ${bigFont ? s.bigFont : ""}`}>
        <Container>
            <div className={s.f_inner}>
                <div className={`${s.f_items} ${s.f_items_first}`}>
                    <div>
                        <Image src={"/images/common/logo.svg"} width={195} height={59} alt="logo" />
                    </div>
                    <p className={s.ministry}>{t("footer:ministryeducation")}</p>
                    <p>{t("footer:allsitematerials")}</p>
                    <div className={s.social}>
                        <Link href={"https://www.facebook.com/uzedu/"} className={s.social_item}>
                            <a className={s.social_item}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9C17 13.4183 13.4183 17 9 17ZM9 17V7.4C9 6.51634 9.71634 5.8 10.6 5.8H11.8M6.2 10.6H11.8"
                                        stroke="white" />
                                </svg>
                            </a>
                        </Link>
                        <Link href={"https://www.instagram.com/uzedu.uz"}>
                            <a className={s.social_item}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.4 5H14.2M4.2 1H13.8C15.5673 1 17 2.43269 17 4.2V13.8C17 15.5673 15.5673 17 13.8 17H4.2C2.43269 17 1 15.5673 1 13.8V4.2C1 2.43269 2.43269 1 4.2 1ZM9 12.2C7.23269 12.2 5.8 10.7673 5.8 9C5.8 7.23269 7.23269 5.8 9 5.8C10.7673 5.8 12.2 7.23269 12.2 9C12.2 10.7673 10.7673 12.2 9 12.2Z"
                                        stroke="white" />
                                </svg>
                            </a>
                        </Link>
                        <Link href={"https://t.me/uzedu/"}>
                            <a className={s.social_item}>
                                <svg width="17" height="15" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17 1.14282L1 6.85711L5.57143 9.14282L12.4286 4.57139L7.85714 10.2857L14.7143 14.8571L17 1.14282Z"
                                        stroke="white" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className={`${s.f_items} ${s.f_items_second}`}>
                    {
                        footerLinks.slice(0, 4).map(item => {
                            return <Link href={item.link} key={item.id}>
                                <a>{t(item.text)}</a>
                            </Link>;
                        })
                    }
                </div>
                <div className={`${s.f_items} ${s.f_items_second} ${s.f_items_second_secon}`}>
                    {
                        footerLinks.slice(4).map(item => {
                            return <Link href={item.link} key={item.id}>
                                <a>{t(item.text)}</a>
                            </Link>;
                        })
                    }
                </div>
                <div className={`${s.f_items} ${s.f_items_third}`}>
                    <h4 className={s.info_title}>{t("footer:information")}</h4>

                    <div className={s.info_items}>
                        <a href={"tel:3652230845"}>(365) 223-08-45</a>
                        <div className={s.inf_img_wr}>
                            <Image src={"/images/common/phone_fot.svg"} width={18} height={18} alt="icon" />
                        </div>
                    </div>

                    <div className={s.info_items}>
                        <a href={"mailto:bux_vxtb@xtv.uz"}>bux_vxtb@xtv.uz</a>
                        <div className={s.inf_img_wr}>
                            <Image src={"/images/common/email_fot.svg"} width={18} height={18} alt="icon" />
                        </div>
                    </div>

                    <div className={s.info_items}>
                        <p>{t("footer:address")}</p>
                        <div className={s.inf_img_wr}>
                            <Image src={"/images/common/location-fot.svg"} width={18} height={18} alt="icon" />
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    </footer>;
};