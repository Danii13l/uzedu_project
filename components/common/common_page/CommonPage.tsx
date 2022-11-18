import { FC } from "react";

import s from './index.module.scss';

import { Breadcrumb } from "@/components/common/breadcrumb/Breadcrumb";
import { Container } from "@/components/common/container/Container";

import { PageInt } from "assets/interfaces/PageDataInt";

export const CommonPage: FC<{ data: PageInt }> = ({ data }): JSX.Element => {
    return <div className={s.page}>
        <Container>
            <Breadcrumb />
            {
                data && <div className={s.inner}>
                    <h1 className={s.title}>{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
            }
        </Container>
    </div>;
};

