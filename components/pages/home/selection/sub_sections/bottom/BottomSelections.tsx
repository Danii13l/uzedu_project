import React, { FC } from "react";
import Link from "next/link";

import s from "./index.module.scss";


import { useTranslation } from "next-i18next";

import { Button } from "@/components/common/button/Button";
import { Container } from "@/components/common/container/Container";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "assets/redux/store";


const cards = [
    {
        id: 1,
        title: "home:forstudents",
        desc: ["home:tutorials", "home:videotutorials", "home:smartland", "home:mugs"],
        link: "#",
        bgImg: "/images/home/select_card_1.jpg"
    },
    {
        id: 2,
        title: "home:forparents",
        desc: ["home:questionnaire", "home:admissiontoschool", "home:transferschool", "home:specializedschools"],
        link: "#",
        bgImg: "/images/home/select_card_2.jpg"
    },
    {
        id: 3,
        title: "home:forteachers",
        desc: ["home:vacancies", "home:training", "home:corecurriculum", "home:teacherdocuments"],
        link: "#",
        bgImg: "/images/home/select_card_3.jpg"
    },
    {
        id: 4,
        title: "home:forSchools",
        desc: ["home:directorfund", "home:educationact", "home:stateeducationals", "home:modernschool"],
        link: "#",
        bgImg: "/images/home/select_card_4.jpg"
    }
];

export const BottomSelections: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    return <div className={`${s.b_selections} ${bigFont ? s.bigFont : ""}`}>
        <Container>
            <div className={s.cards_wrap}>
                {
                    cards.map(item => {
                        return <div className={s.card} key={item.id}>
                            <div className={s.card_inner_wrapper} style={{ backgroundImage: `url(${item.bgImg})` }}>
                                <div className={s.card_inner}>
                                    <h4 className={s.card_title}>{t(item.title)}</h4>
                                    <p className={s.card_parag_wrap}>
                                        {item.desc.map((par, i) => {
                                            return <React.Fragment key={par}>{t(par)} </React.Fragment>;
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className={s.btn}>
                                <Link href={item.link}>
                                    <a>
                                        <Button classN={"second"}>
                                            {t("buttons:go")}
                                        </Button>
                                    </a>
                                </Link>
                            </div>

                        </div>;
                    })
                }

            </div>
        </Container>

        <div className={s.content}>
            <Container>
                <div className={s.con_inner}>
                    <div className={s.con_text_wr}>
                        <h3 className={s.con_title}>{t("home:cantgotoschool")}</h3>
                        <p className={s.con_text}><a
                            href={"https://maktab.uz/"}>Maktab.uz</a> - {t("home:cantgotoschooltext")} </p>
                        <div className={s.con_btn}>
                            <Button classN={"second"}>{t("buttons:more")}</Button>
                        </div>
                    </div>
                    <div className={s.content_img_wr}>
                        <Image src={"/images/home/computer.png"} width={556} height={370} quality={100} />
                    </div>
                </div>
            </Container>
        </div>
    </div>;
};