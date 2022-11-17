import { FC } from "react";

import s from './index.module.scss';


import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";
import { Container } from "@/components/common/container/Container";

import { useTranslation } from "next-i18next";


interface StatisticsInt {
    allAddr: string;
    allReq: string;
    checkedAddr: string;
    checkedReq: string;
    id: number;
    processAddr: string;
    processReq: string;
    rejectedAddr: string;
}

export const Statistics: FC<{ data: StatisticsInt }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    return <div className={s.stat}>
        <SectionWrapper>
            <Container>

                {
                    data && <>
                        <div className={s.stat_item}>
                            <h4 className={s.stat_title}>{t("home:callstatistics")}</h4>
                            <div className={s.stat_content}>
                                <div className={s.stat_content_inner}>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.allAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:totalappeals")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.checkedAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:appealsconsidered")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.rejectedAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:rejectedrequests")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.processAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:inconsideration")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.stat_item}>
                            <h4 className={s.stat_title}>{t("home:requestproces")}</h4>
                            <div className={s.stat_content}>
                                <div className={`${s.stat_content_inner} ${s.stat_content_inner2}`}>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.allReq}</p>
                                        <p className={s.stat_content_text}>{t("home:numberofrequests")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.checkedReq}</p>
                                        <p className={s.stat_content_text}>{t("home:reviewedrequests")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{data.processReq}</p>
                                        <p className={s.stat_content_text}>{t("home:underconsideration")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

            </Container>
        </SectionWrapper>
    </div>;
};