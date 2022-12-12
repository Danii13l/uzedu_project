import { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Form, Formik } from "formik";

import { FormActions } from "@/components/pages/admin/form_items/FormActions";
import { InputsBlockMain } from "@/components/pages/admin/form_items/InputsBlockMain";
import { InputsWrapper } from "@/components/pages/admin/form_items/InputsWrapper";

import { Button } from "@/components/common/button/Button";
import { PreviewImage } from "@/components/pages/admin/form_items/PreviewImage";

import { FormWrapper } from "@/components/pages/admin/form_items/FormWrapper";
import { getAuthorizationHeader, myAxios } from 'assets/axios/myAxios';
import { useTranslation } from 'next-i18next';

export const InfoForm: FC<{ id?: string; type?: string }> = ({ id, type }): JSX.Element => {
    const { push } = useRouter();

    const { t } = useTranslation();

    const [dataOut, setDataOut] = useState<{
        title: string;
        titleRu: string;
        titleUz: string;
        description: string;
        descriptionRu: string;
        descriptionUz: string;
        link: string;
        url: string | null;
        id: number,
        type: string
    } | null>(null);

    useEffect(() => {
        (async function () {
            try {
                const { data } = await myAxios(`/api/dashboard/information/${id}`, {
                    headers: {
                        Authorization: getAuthorizationHeader()
                    }
                });
                setDataOut(data);
            } catch (err) {
            }
        }());
    }, []);


    return (
        <FormWrapper>

            <FormActions isDelete={true} data={dataOut} typeOfPage={t(`header:${dataOut?.type?.toLowerCase() ?? type}`)} deleteFetch="dashboard/information" pushTo="/admin" />
            <Formik
                initialValues={{
                    type: dataOut?.type ?? type?.toUpperCase(),
                    title: dataOut?.title ?? "",
                    titleRu: dataOut?.titleRu ?? "",
                    titleUz: dataOut?.titleUz ?? "",
                    description: dataOut?.description ?? "",
                    descriptionRu: dataOut?.descriptionRu ?? "",
                    descriptionUz: dataOut?.descriptionUz ?? "",
                    image: dataOut?.url ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    try {
                        const formData = new FormData();
                        dataOut?.id && formData.append("id", dataOut?.id as any);
                        // @ts-ignore
                        for (let key in val) formData.append(key, val[key]);
                        dataOut?.id ? await myAxios.put("/api/dashboard/information", formData, {
                            headers: {
                                Authorization: getAuthorizationHeader()
                            }
                        }) : await myAxios.post("/api/dashboard/information", formData, {
                            headers: {
                                Authorization: getAuthorizationHeader()
                            }
                        });
                        push("/admin");
                    } catch (err) {
                        console.log(err);
                    }
                }}

            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>

                        <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title",]} />
                        <InputsBlockMain title={"Описание"} arr={["descriptionRu", "descriptionUz", "description",]} />

                        <InputsWrapper title={"Фотография"}>
                            <PreviewImage condit={values?.image}
                                imgUrl={values?.image}
                                valueToDelete={values?.image}
                                formikSetFun={setFieldValue}
                                valueToSave={"image"}
                                isToUpload={true}
                            />
                        </InputsWrapper>

                        <div>
                            <Button classN={"main"} submit={true}>Отправить</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
};