import { FC } from "react";

import s from './index.module.scss';

import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "assets/redux/store";
import { useTranslation } from 'next-i18next';



interface BannerInt {
    barkamol: string;
    description: string;
    houses: string;
    pupils: string;
    school: string;
    teachers: string;
    title: string;
    url: string;
}


export const Banner: FC<{ data: BannerInt[] }> = ({ data }): JSX.Element => {

    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    const { t } = useTranslation();


    return <>
        {data && (data.length > 0) && <div className={s.banner} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${data[0].url})` }}>
            <SectionWrapper>
                <div className={`${s.inner} ${bigFont ? s.bigFont : ""}`}>
                    <div className={s.socials}>
                        <Link href={"https://www.facebook.com/buxorovxtb"} className={s.social_item}>
                            <a className={s.social_item}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9C17 13.4183 13.4183 17 9 17ZM9 17V7.4C9 6.51634 9.71634 5.8 10.6 5.8H11.8M6.2 10.6H11.8"
                                        stroke="white" />
                                </svg>
                            </a>
                        </Link>
                        <Link href={"https://www.instagram.com/bvxtb/"}>
                            <a className={s.social_item}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.4 5H14.2M4.2 1H13.8C15.5673 1 17 2.43269 17 4.2V13.8C17 15.5673 15.5673 17 13.8 17H4.2C2.43269 17 1 15.5673 1 13.8V4.2C1 2.43269 2.43269 1 4.2 1ZM9 12.2C7.23269 12.2 5.8 10.7673 5.8 9C5.8 7.23269 7.23269 5.8 9 5.8C10.7673 5.8 12.2 7.23269 12.2 9C12.2 10.7673 10.7673 12.2 9 12.2Z"
                                        stroke="white" />
                                </svg>
                            </a>
                        </Link>
                        <Link href={"https://t.me/bvxtb"}>
                            <a className={s.social_item}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17 1.14282L1 6.85711L5.57143 9.14282L12.4286 4.57139L7.85714 10.2857L14.7143 14.8571L17 1.14282Z"
                                        stroke="white" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </Link>
                    </div>
                    <div className={s.content}>
                        <h1 className={s.title}>{data[0].title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: data[0].description }}></div>
                    </div>

                    <div className={s.line_content}>
                        <div className={s.line_items}>
                            <h4 className={s.l_i_title}>{data[0].pupils}</h4>
                            <p className={s.l_i_text}>{t("home:pupils")}</p>
                        </div>
                        <div className={s.line_items}>
                            <h4 className={s.l_i_title}>{data[0].teachers}</h4>
                            <p className={s.l_i_text}>{t("home:teachers")}</p>
                        </div>
                        <div className={s.line_items}>
                            <h4 className={s.l_i_title}>{data[0].barkamol}</h4>
                            <p className={s.l_i_text}>{t("home:barkamloSchools")}</p>
                        </div>
                        <div className={s.line_items}>
                            <h4 className={s.l_i_title}>{data[0].houses}</h4>
                            <p className={s.l_i_text}>{t("home:citizen")}</p>
                        </div>
                        <div className={s.line_items}>
                            <h4 className={s.l_i_title}>{data[0].school}</h4>
                            <p className={s.l_i_text}>{t("home:checkedaddres")}</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>}
    </>;
};