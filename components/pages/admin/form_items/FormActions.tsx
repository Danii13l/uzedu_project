import { FC, useEffect, useState } from "react";
import s from "./index.module.scss";

import { myAxios } from "assets/axios/myAxios";

import { useRouter } from "next/router";


export const FormActions: FC<{ isDelete: boolean; data?: any; typeOfPage: string; pushTo?: string; deleteFetch?: string }> = ({
    data,
    typeOfPage,
    deleteFetch,
    pushTo,
    isDelete
}): JSX.Element => {
    const [methodForm, setMethodForm] = useState<"POST" | "PUT">("POST");
    const { push } = useRouter();

    useEffect(() => {
        setMethodForm(data ? "PUT" : "POST");
    }, [data]);

    const handleMethodForm = (val: "POST" | "PUT") => {
        return () => setMethodForm(val);
    };


    const handleDeletePage = async () => {
        try {
            await myAxios.delete(`/api/${deleteFetch}/${data?.id}`);
            pushTo && await push(pushTo);
        } catch (err) {
        }
    };


    return <div className={s.actions_button}>
        <div className={s.toggle_method}>
            <span className={`${s.toggle_item} ${methodForm === "POST" ? s.active : ""} ${data ? s.block : ""}`}
                onClick={handleMethodForm("POST")}>Создать</span>
            <span className={`${s.toggle_item} ${methodForm === "PUT" ? s.active : ""} ${!data ? s.block : ""}`}
                onClick={handleMethodForm("PUT")}>Редактировать</span>
        </div>
        <p className={s.actions_typeOfPage}>{typeOfPage}</p>

        {data && isDelete &&
            <button onClick={handleDeletePage} type={"button"} className={s.delete_page}>Удалить</button>}
    </div>;
};