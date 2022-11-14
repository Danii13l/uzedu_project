import {FC} from "react";

import {useRouter} from "next/router";

import {Field, FieldArray, Form, Formik} from "formik";

import {FormActions} from "@/components/pages/admin/form_items/FormActions";
import {InputsBlockMain} from "@/components/pages/admin/form_items/InputsBlockMain";
import {InputsWrapper} from "@/components/pages/admin/form_items/InputsWrapper";
import {FieldArrayWrapper} from "@/components/pages/admin/form_items/FieldArrayWrapper";
import {InputsBlock} from "@/components/pages/admin/form_items/InputsBlock";
import {Button} from "@/components/common/button/Button";
import {PreviewImage} from "@/components/pages/admin/form_items/PreviewImage";
import {InputsFormik} from "@/components/common/input/InputsFormik";
import {FormWrapper} from "@/components/pages/admin/form_items/FormWrapper";

export const InfoForm: FC = (): JSX.Element => {
    const {query: {slug}, push} = useRouter();

    return (
        <FormWrapper>

            <FormActions data={false} typeOfPage={"Информация"} deleteType={"должностное информацию"}/>
            <Formik
                initialValues={{
                    title: "",
                    titleRu: "",
                    titleUz: "",
                    description: "",
                    descriptionRu: "",
                    descriptionUz: "",
                    url: ""
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    console.log(val);
                }}

            >
                {({values, setFieldValue, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>

                        <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title",]}/>
                        <InputsBlockMain title={"Описание"} arr={["descriptionRu", "descriptionUz", "description",]}/>

                        <InputsWrapper title={"Фотография"}>
                            <PreviewImage condit={values?.url}
                                          imgUrl={values?.url}
                                          formikSetFun={setFieldValue}
                                          valueToDelete={values?.url}
                                          valueToSave={"url"}
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