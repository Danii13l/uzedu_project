import {FC} from "react";

import s from './index.module.scss';

import {SectionWrapper} from "@/components/common/section_wrapper/SectionWrapper";
import {Container} from "@/components/common/container/Container";

import {useTranslation} from "next-i18next";
import Image from "next/image";

const usefulLinks = [
    {
        id: 1,
        link: "https://my.gov.uz",
        linkText: "my.gov.uz",
        img: "/images/home/useful_link1.png",
        text: "home:singleportal"
    },
    {
        id: 2,
        link: "https://kitob.uz/",
        linkText: "kitob.uz",
        img: "/images/home/useful_link2.png",
        text: "home:childrenlibrary"
    },
    {
        id: 3,
        link: "https://data.gov.uz/",
        linkText: "data.gov.uz",
        img: "/images/home/useful_link3.png",
        text: "home:openportal"
    },
    {
        id: 4,
        link: "https://constitution.uz/oz",
        linkText: "constitution.uz",
        img: "/images/home/useful_linka_state.png",
        text: "home:constitutionuz"
    },
    {
        id: 5,
        link: "https://strategy.uz/",
        linkText: "strategy.uz",
        img: "/images/home/useful_link4.png",
        text: "home:centerdevelopment"
    },
    {
        id: 6,
        link: "https://lex.uz/uz/",
        linkText: "lex.uz",
        img: "/images/home/useful_link5.png",
        text: "home:nationaldatabase"
    },
    {
        id: 7,
        link: "https://president.uz/uz",
        linkText: "president.uz",
        img: "/images/home/useful_linka_state.png",
        text: "home:websitepresident"
    },
    {
        id: 8,
        link: "https://pm.gov.uz/ru#/",
        linkText: "pm.gov.uz",
        img: "/images/home/useful_linka_state.png",
        text: "home:virtualpresident"
    },

]

export const UsefulLinks: FC = (): JSX.Element => {
    const {t} = useTranslation();

    return <div className={s.useful}>
        <SectionWrapper>
            <Container>
                <h3 className={s.useful_title}>{t("home:usefullinks")}</h3>
                <div className={s.useful_inner}>
                    {
                        usefulLinks.map(item => {
                            return <div className={s.item}>
                                <div className={s.item_content}>
                                    <div className={s.item_img_wrapper}>
                                        <Image src={item.img} layout={"fill"} objectFit={"cover"} quality={100}/>
                                    </div>
                                    <p className={s.item_text}>{t(item.text)}</p>
                                </div>

                                <div className={s.item_link_wr}>
                                    <a className={s.item_link} href={item.link}>{item.linkText}</a>
                                </div>

                            </div>
                        })
                    }
                </div>
            </Container>
        </SectionWrapper>
    </div>
}