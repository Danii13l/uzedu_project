import {FC} from "react";

import {TopSelections} from "@/components/pages/home/selection/sub_sections/top/TopSelections";
import {BottomSelections} from "@/components/pages/home/selection/sub_sections/bottom/BottomSelections";
import {SectionWrapper} from "@/components/common/section_wrapper/SectionWrapper";

export const Selection: FC = (): JSX.Element => {
    return <div>
        <SectionWrapper>
            <TopSelections/>
            <BottomSelections/>
        </SectionWrapper>
    </div>
}