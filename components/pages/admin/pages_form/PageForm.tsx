import { FC } from "react";
import { useRouter } from "next/router";
import { FieldArray, Form, Formik } from "formik";

import { initialValuesIint } from "assets/interfaces/pageFormInt";
import { getInitValuePageForm } from "assets/function/getInitValuePageForm";
import { FieldArrayValue } from "assets/constants/pageForm";

import { Button } from "@/components/common/button/Button";
import { InputsFormik } from "@/components/common/input/InputsFormik";
import { InputsBlock } from "@/components/pages/admin/form_items/InputsBlock";
import { InputsBlockMain } from "@/components/pages/admin/form_items/InputsBlockMain";
import { InputsWrapper } from "@/components/pages/admin/form_items/InputsWrapper";
import { FieldArrayWrapper } from "@/components/pages/admin/form_items/FieldArrayWrapper";
import { FormActions } from "@/components/pages/admin/form_items/FormActions";
import { PreviewImage } from "@/components/pages/admin/form_items/PreviewImage";
import { myAxios } from "assets/axios/myAxios";
import { FormWrapper } from "@/components/pages/admin/form_items/FormWrapper";


export const PageForm: FC<{ data: initialValuesIint | null }> = ({ data }): JSX.Element => {
    const { query: { slug }, push } = useRouter();

    return <FormWrapper>
        <FormActions isDelete={true} data={data} typeOfPage={"Страница"} />
        <Formik
            initialValues={{
                ...getInitValuePageForm(data),
                menuId: slug ? +slug[1] : 0,
                subMenuId: slug ? +slug[3] : 0
            }}
            enableReinitialize={true}
            onSubmit={async (val) => {
                try {
                    if (!data) {
                        await myAxios.post("/api/dashboard/page", JSON.stringify(val), {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    } else {
                        await myAxios.put(`/api/dashboard/page?id=${data?.id}`, { ...val, id: data?.id });
                    }
                    await push("/admin");
                } catch (err) {
                    console.log(err);
                }
            }}

        >
            {({ values, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <InputsBlockMain title={"Заголовок страницы"} arr={["titleRu", "titleUz", "title"]} />
                    <InputsBlockMain title={"Описание страницы"}
                        arr={["descriptionRu", "descriptionUz", "description"]} textarea={true} />


                    <InputsWrapper title={"Видео"}>
                        <FieldArray
                            name="videos"
                            render={({ push, remove }) => (
                                <div>
                                    {values?.videos.map((video, index) => (
                                        <FieldArrayWrapper deleteFun={() => remove(index)} key={index}>
                                            <InputsBlock index={index} type={"videos"} title={"Заголовок"}
                                                value={["title", "titleRu", "titleUz"]} />
                                            <InputsFormik name={`videos[${index}].url`} label={"Ссылка"} />
                                        </FieldArrayWrapper>
                                    ))}

                                    <div onClick={() =>
                                        push(FieldArrayValue)}>
                                        <Button classN={"main"}>Добавить видео</Button>
                                    </div>
                                </div>
                            )}
                        />
                    </InputsWrapper>

                    <InputsWrapper title={"Фотографии"}>
                        <FieldArray
                            name="images"
                            render={({ push, remove }) => (
                                <div>
                                    {values?.images.map((image, index) => (
                                        <FieldArrayWrapper deleteFun={() => remove(index)} key={index}>
                                            <InputsBlock index={index} type={"images"} title={"Заголовок"}
                                                value={["title", "titleRu", "titleUz"]} />
                                            <PreviewImage condit={values?.images[index]["url"]}
                                                imgUrl={values?.images[index]["url"]}
                                                formikSetFun={setFieldValue}
                                                valueToDelete={values?.images[index]["url"]}
                                                valueToSave={`images[${index}].url`}
                                            />
                                        </FieldArrayWrapper>
                                    ))}
                                    <div onClick={() =>
                                        push(FieldArrayValue)}>
                                        <Button classN={"main"}>Добавить Фотографию</Button>
                                    </div>

                                </div>
                            )}
                        />
                    </InputsWrapper>


                    <InputsWrapper title={"Файлы"}>
                        <FieldArray
                            name="files"
                            render={({ push, remove }) => (
                                <div>
                                    {values?.files.map((fileF, index) => (
                                        <FieldArrayWrapper deleteFun={() => remove(index)} key={index}>
                                            <InputsBlock index={index} type={"files"} title={"Заугаловок"}
                                                value={["title", "titleRu", "titleUz"]} />
                                            <PreviewImage condit={values?.files[index]["url"]}
                                                imgUrl={values?.files[index]["url"]}
                                                formikSetFun={setFieldValue}
                                                valueToSave={`files[${index}].url`}
                                                valueToDelete={values?.files[index]["url"]}
                                                isFile={true}
                                            />
                                        </FieldArrayWrapper>
                                    ))}
                                    <div onClick={() =>
                                        push(FieldArrayValue)}>
                                        <Button classN={"main"}>Добавить файл</Button>
                                    </div>

                                </div>
                            )}
                        />
                    </InputsWrapper>

                    <div>
                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </div>
                </Form>
            )}
        </Formik>
    </FormWrapper>;
};