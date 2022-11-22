import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import s from './index.module.scss';

import { Container } from "@/components/common/container/Container";
import { Title } from "@/components/common/title/Title";
import { Button } from "@/components/common/button/Button";
import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";

import { useTranslation } from "next-i18next";

import { months } from "assets/constants/months";
import { useSelector } from "react-redux";
import { RootState } from "assets/redux/store";


const offers = [
    { id: 1, title: "home:appeals", text: "home:appealstext", link: "#", img: "/images/home/offer_1.svg" },
    { id: 2, title: "home:giveidea", text: "home:appealstext", link: "https://idea.uzedu.uz/uz", img: "/images/home/offer_2.svg" },
    { id: 3, title: "home:receptionschedule", text: "home:receptiontext", link: "#", img: "/images/home/offers_3.svg" },
];

interface NewsItn {
    id: number;
    url: string;
    createdAt: Date;
    title: string

}

export const News: FC<{ data: NewsItn }> = ({ data }): JSX.Element => {
    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    const { t } = useTranslation();

    return <div className={s.news}>
        <SectionWrapper>
            <Container>
                <div className={`${s.n_inner} ${bigFont ? s.bigFont : ""}`}>
                    <div className={s.n_section}>
                        <div className={s.n_section_top}>
                            <Title title={t("common:news")} />

                            <Link href={"/info_page/informationService/5/ministrynews/32"}>
                                <a className={s.all_news}>{t("buttons:allnews")}</a>
                            </Link>
                        </div>

                        <div className={s.n_section_inner}>
                            {
                                data && Array.isArray(data) && data.slice(0, 4).map(item => {
                                    return <div key={item.id} className={s.news_item}
                                        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${item.url})` }}>
                                        <div className={s.news_item_inner}>


                                            <div className={s.news_item_time_wr}>
                                                <span className={s.news_item_day}>{item?.createdAt?.slice(8, 10)}</span>
                                                <span
                                                    className={s.news_item_month}>{t(months[item?.createdAt?.slice(5, 7) - 1])}</span>
                                                <span className={s.news_item_year}>{item?.createdAt?.slice(0, 4)}</span>
                                            </div>

                                            <p className={s.news_item_title}>{item.title}</p>
                                        </div>
                                        <Link href={`/info_page/single_info/informationService/ministrynews/${item.id}`}>
                                            <a className={s.news_link}></a>
                                        </Link>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                    <div className={s.offers_section}>
                        <Title title={t("common:offers")} />

                        <div className={s.o_s_inner}>
                            {
                                offers.map((item, index: number) => {
                                    return <div key={item.id} className={s.offer_item}>
                                        <div className={s.o_item_top}>
                                            <Image src={item.img} width={48} height={48} alt="icon" />
                                            <h5>{t(item.title)}</h5>
                                        </div>

                                        <p className={s.o_item_text}>
                                            {t(item.text)}
                                        </p>

                                        {
                                            index === 1 ? <a className={s.o_item_btn} href={item.link}>
                                                <Button classN={"third"}>{t("buttons:go")}</Button>
                                            </a> : <Link href={item.link}>
                                                <a className={s.o_item_btn}><Button classN={"third"}>{t("buttons:go")}</Button></a>
                                            </Link>
                                        }

                                        <div className={s.o_item_border}></div>
                                    </div>;
                                })
                            }
                            <div className={s.news_socials}>
                                <div className={s.n_soc_item}>
                                    <div className={s.n_soc_item_img_wr}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9C17 13.4183 13.4183 17 9 17ZM9 17V7.4C9 6.51634 9.71634 5.8 10.6 5.8H11.8M6.2 10.6H11.8"
                                                stroke="#213D88" />
                                        </svg>
                                    </div>
                                    <a href={"https://ru-ru.facebook.com/uzedu/"}>@uzedu</a>
                                </div>

                                <div className={s.n_soc_item}>
                                    <div className={s.n_soc_item_img_wr}>
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17 1.14282L1 6.85711L5.57143 9.14282L12.4286 4.57139L7.85714 10.2857L14.7143 14.8571L17 1.14282Z"
                                                stroke="#213D88" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <a href={"https://t.me/uzedu/"}>@uzedu</a>
                                </div>

                                <div className={s.n_soc_item}>
                                    <div className={s.n_soc_item_img_wr}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.4 5H14.2M4.2 1H13.8C15.5673 1 17 2.43269 17 4.2V13.8C17 15.5673 15.5673 17 13.8 17H4.2C2.43269 17 1 15.5673 1 13.8V4.2C1 2.43269 2.43269 1 4.2 1ZM9 12.2C7.23269 12.2 5.8 10.7673 5.8 9C5.8 7.23269 7.23269 5.8 9 5.8C10.7673 5.8 12.2 7.23269 12.2 9C12.2 10.7673 10.7673 12.2 9 12.2Z"
                                                stroke="#213D88" />
                                        </svg>
                                    </div>
                                    <a href={"https://www.instagram.com/uzedu.uz"}>/uzedu.uz</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </Container>
        </SectionWrapper>
    </div >;
};