import { Button } from "@/components/common/button/Button";

import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";

import { FormWrapper } from "../form_items/FormWrapper";
import { InputsBlockMain } from "../form_items/InputsBlockMain";

import { myAxios } from 'assets/axios/myAxios';
import { useRouter } from 'next/router';
import { FormActions } from '@/components/pages/admin/form_items/FormActions';

export const HomeOpinions: FC<{ id?: string }> = ({ id }): JSX.Element => {
    const { push } = useRouter();

    const [dataOut, setDataOut] = useState<{
        title: string;
        titleRu: string;
        titleUz: string;
        subtitle: string;
        subtitleRu: string;
        subtitleUz: string;
        text: string;
        textRu: string;
        textUz: string;
        id: number
    } | null>(null);

    useEffect(() => {
        (async function () {
            try {
                const { data } = await myAxios(`/api/dashboard/opinion/${id}`);
                setDataOut(data);
            } catch (err) {
                console.log(err);
            }
        }());
    }, []);


    return (
        <FormWrapper>
            <FormActions isDelete={true} data={dataOut} typeOfPage={"Мнения"} deleteType={"мнение"} deleteFetch="dashboard/opinion" pushTo="/admin/pages/home_page/0/homeopinions/2/HOMEOPINIONS" />
            <Formik
                initialValues={{
                    type: "OPINION",
                    title: dataOut?.title ?? "",
                    titleRu: dataOut?.titleRu ?? "",
                    titleUz: dataOut?.titleUz ?? "",
                    subtitle: dataOut?.subtitle ?? "",
                    subtitleRu: dataOut?.subtitleRu ?? "",
                    subtitleUz: dataOut?.subtitleUz ?? "",
                    text: dataOut?.text ?? "",
                    textRu: dataOut?.textRu ?? "",
                    textUz: dataOut?.textUz ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    try {
                        id ? await myAxios.patch("/api/dashboard/opinion", { ...val, id: dataOut?.id }) : await myAxios.post("/api/dashboard/opinion", val);
                        await push("/admin/pages/home_page/0/homeopinions/2/HOMEOPINIONS");
                    } catch (err) {
                        console.log(err)
                    }
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title"]} />
                        <InputsBlockMain title={"Подзаголовок"} arr={["subtitleRu", "subtitleUz", "subtitle"]} />
                        <InputsBlockMain title={"Текст"} arr={["textRu", "textUz", "text"]} />
                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper >
    );
}