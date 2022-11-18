import { FC } from "react";

import s from './index.module.scss';


import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";
import { Container } from "@/components/common/container/Container";

import { useTranslation } from "next-i18next";


interface StatisticsInt {
    statistic: {
        allAddr: string;
        allReq: string;
        checkedAddr: string;
        checkedReq: string;
        id: number;
        processAddr: string;
        processReq: string;
        rejectedAddr: string;
    };
}
export const Statistics: FC<{ data: StatisticsInt }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const statistic = data?.statistic;

    return <div className={s.stat}>
        <SectionWrapper>
            <Container>
                {
                    statistic && <>
                        <div className={s.stat_item}>
                            <h4 className={s.stat_title}>{t("home:callstatistics")}</h4>
                            <div className={s.stat_content}>
                                <div className={s.stat_content_inner}>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{statistic.allAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:totalappeals")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{statistic.checkedAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:appealsconsidered")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{statistic.rejectedAddr}</p>
                                        <p className={s.stat_content_text}>{t("home:rejectedrequests")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{statistic.processAddr}</p>
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
                                        <p className={s.stat_content_num}>{statistic.allReq}</p>
                                        <p className={s.stat_content_text}>{t("home:numberofrequests")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{statistic.checkedReq}</p>
                                        <p className={s.stat_content_text}>{t("home:reviewedrequests")}</p>
                                    </div>
                                    <div className={s.stat_content_item}>
                                        <p className={s.stat_content_num}>{statistic.processReq}</p>
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