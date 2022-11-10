import {FC, useCallback} from "react";
import s from "./index.module.scss";
import {Button} from "@/components/common/button/Button";

export const FieldArrayWrapper: FC<{ children: React.ReactNode; deleteFun: any }> = ({
                                                                                         children,
                                                                                         deleteFun
                                                                                     }): JSX.Element => {


    return <div className={s.fieldArray_wr}>
        <div className={s.fieldArray_box}>
            {children}
        </div>
        <div onClick={deleteFun} className={s.fieldArray_btn}>
            <Button classN={"second"}>Удалить</Button>
        </div>
    </div>;
};