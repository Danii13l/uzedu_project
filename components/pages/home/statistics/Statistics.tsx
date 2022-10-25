import {FC} from "react";

import s from './index.module.scss';


import {SectionWrapper} from "@/components/common/section_wrapper/SectionWrapper";
import {Container} from "@/components/common/container/Container";

import {useTranslation} from "next-i18next";

export const Statistics: FC = (): JSX.Element => {
    const {t} = useTranslation();
    return <div className={s.stat}>
        <SectionWrapper>
            <Container>
                <div className={s.stat_item}>
                    <h4 className={s.stat_title}>{t("home:callstatistics")}</h4>
                    <div className={s.stat_content}>
                        <div className={s.stat_content_inner}>
                            <div className={s.stat_content_item}>
                                <p className={s.stat_content_num}>3 925</p>
                                <p className={s.stat_content_text}>{t("home:totalappeals")}</p>
                            </div>
                            <div className={s.stat_content_item}>
                                <p className={s.stat_content_num}>3 925</p>
                                <p className={s.stat_content_text}>{t("home:appealsconsidered")}</p>
                            </div>
                            <div className={s.stat_content_item}>
                                <p className={s.stat_content_num}>25</p>
                                <p className={s.stat_content_text}>{t("home:rejectedrequests")}</p>
                            </div>
                            <div className={s.stat_content_item}>
                                <p className={s.stat_content_num}>2</p>
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
                                <p className={s.stat_content_num}>64</p>
                                <p className={s.stat_content_text}>{t("home:numberofrequests")}</p>
                            </div>
                            <div className={s.stat_content_item}>
                                <p className={s.stat_content_num}>35</p>
                                <p className={s.stat_content_text}>{t("home:reviewedrequests")}</p>
                            </div>
                            <div className={s.stat_content_item}>
                                <p className={s.stat_content_num}>25</p>
                                <p className={s.stat_content_text}>{t("home:underconsideration")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </SectionWrapper>
    </div>;
};