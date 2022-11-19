import { FC } from "react";

import s from './index.module.scss';

import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";
import { Container } from "@/components/common/container/Container";

import { useTranslation } from "next-i18next";
import Image from "next/image";



interface UsefulLinks {
    id: number;
    link: string;
    title: string;
    url: string
}

export const UsefulLinks: FC<{ data: UsefulLinks[] }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const myLoader = ({ src }: any) => {
        return `${src}`;
    };

    return <div className={s.useful}>
        <SectionWrapper>
            <Container>
                <h3 className={s.useful_title}>{t("home:usefullinks")}</h3>
                <div className={s.useful_inner}>
                    {
                        data && typeof data !== "string" && data?.map(item => {
                            return <div className={s.item} key={item.id}>
                                <div className={s.item_content}>
                                    <div className={s.item_img_wrapper}>
                                        <Image loader={myLoader} src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} layout={"fill"} objectFit={"cover"} quality={100} unoptimized alt="link" />
                                    </div>
                                    <p className={s.item_text}>{item.title}</p>
                                </div>

                                <div className={s.item_link_wr}>
                                    <a className={s.item_link} href={item.link}>{item.link}</a>
                                </div>

                            </div>;
                        })
                    }
                </div>
            </Container>
        </SectionWrapper>
    </div>;
};