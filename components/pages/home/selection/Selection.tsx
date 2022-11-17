import { FC } from "react";

import { TopSelections } from "@/components/pages/home/selection/sub_sections/top/TopSelections";
import { BottomSelections } from "@/components/pages/home/selection/sub_sections/bottom/BottomSelections";
import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";

interface SliderInt {
    id: number;
    title: string;
    description: string;
    url: string;
    link: string;
};

export const Selection: FC<{ data: SliderInt[] }> = ({ data }): JSX.Element => {
    return <div>
        <SectionWrapper>
            <TopSelections data={data} />
            <BottomSelections />
        </SectionWrapper>
    </div>;
};