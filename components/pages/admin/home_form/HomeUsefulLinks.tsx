import { FC, useEffect, useState } from "react";
import { useRouter } from 'next/router';


import { Button } from "@/components/common/button/Button";
import { InputsFormik } from "@/components/common/input/InputsFormik";
import { Form, Formik } from "formik";

import { FormActions } from "../form_items/FormActions";
import { FormWrapper } from "../form_items/FormWrapper";
import { InputsBlockMain } from "../form_items/InputsBlockMain";
import { InputsWrapper } from "../form_items/InputsWrapper";
import { PreviewImage } from "../form_items/PreviewImage";

import { myAxios } from 'assets/axios/myAxios';



export const HomeUsefulLinks: FC<{ id?: string }> = ({ id }): JSX.Element => {
    const { push } = useRouter();

    const [dataOut, setDataOut] = useState<{
        title: string;
        titleRu: string;
        titleUz: string;
        link: string;
        url: string | null;
    } | null>(null);

    useEffect(() => {
        (async function () {
            try {
                const { data } = await myAxios(`/api/dashboard/multipart/${id}`);
                setDataOut(data);
            } catch (err) {
                console.log(err);
            }
        }());
    }, []);

    return (
        <FormWrapper>
            <FormActions isDelete={true} data={dataOut} typeOfPage={"Полезные ссылки"} deleteType={"ссылку"} deleteFetch="dashboard/multipart" pushTo="/admin/pages/home_page/0/homelinks/4/HOMELINKS" />
            <Formik
                initialValues={{
                    type: "LINK",
                    title: dataOut?.title ?? "",
                    titleRu: dataOut?.titleRu ?? "",
                    titleUz: dataOut?.titleUz ?? "",
                    link: dataOut?.link ?? "",
                    image: dataOut?.url ?? ""
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    try {
                        const formData = new FormData();
                        // @ts-ignore
                        for (let key in val) formData.append(key, val[key]);
                        id && formData.append("id", id);
                        id ? await myAxios.patch("/api/dashboard/multipart", formData) : await myAxios.post("/api/dashboard/multipart", formData);
                        await push("/admin/pages/home_page/0/homelinks/4/HOMELINKS");

                    } catch (err) {
                        console.log(err);
                    }
                }}
            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title"]} />
                        <InputsWrapper title="Ссылка">
                            <InputsFormik name={"link"} label={""} />
                        </InputsWrapper>

                        <InputsWrapper title="Фотография">
                            <PreviewImage condit={values?.image}
                                imgUrl={values?.image}
                                valueToDelete={values?.image}
                                formikSetFun={setFieldValue}
                                valueToSave={"image"}
                                isToUpload={true}
                            />
                        </InputsWrapper>
                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
}