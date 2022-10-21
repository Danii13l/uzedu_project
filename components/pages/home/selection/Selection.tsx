import {FC} from "react";

import {TopSelections} from "@/components/pages/home/selection/sub_sections/top/TopSelections";
import {BottomSelections} from "@/components/pages/home/selection/sub_sections/bottom/BottomSelections";

export const Selection: FC = (): JSX.Element => {
    return <div>
        <TopSelections/>
        <BottomSelections/>
    </div>
}