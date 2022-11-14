import {useImagesToServer} from "../../../../assets/hooks/useImagesToServer";
import {useRouter} from "next/router";
import {FormWrapper} from "@/components/pages/admin/form_items/FormWrapper";
import {FieldArray, Form, Formik} from "formik";
import {myAxios} from "../../../../assets/axios/myAxios";
import {InputsBlockMain} from "@/components/pages/admin/form_items/InputsBlockMain";

import Image from "next/image";
import {Button} from "@/components/common/button/Button";
import {FieldArrayWrapper} from "@/components/pages/admin/form_items/FieldArrayWrapper";
import {InputsBlock} from "@/components/pages/admin/form_items/InputsBlock";
import {InputsFormik} from "@/components/common/input/InputsFormik";
import {InputsWrapper} from "@/components/pages/admin/form_items/InputsWrapper";

export const VideoGallery = () => {

    const {push} = useRouter();
    return <FormWrapper>
        <Formik
            initialValues={{
                titleRu: "",
                titleUz: "",
                title: "",
                descriptionRu: "",
                descriptionUz: "",
                description: "",
                links: [],
            }}
            enableReinitialize={true}
            onSubmit={async (val) => {
                console.log(val);
            }}
        >
            {({values, setFieldValue, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title"]}/>
                    <InputsBlockMain title={"Описание"}
                                     arr={["descriptionRu", "descriptionUz", "description"]} textarea={true}/>

                    <InputsWrapper title={"Ссылки"}>
                        <FieldArray
                            name="links"
                            render={({push, remove}) => (
                                <div>
                                    {values?.links.map((video, index) => (
                                        <FieldArrayWrapper deleteFun={() => remove(index)} key={index}>
                                            <InputsFormik name={`links[${index}].link`} label={"ссылка"}/>
                                        </FieldArrayWrapper>
                                    ))}

                                    <div onClick={() => push({link: ""})}>
                                        <Button classN={"main"}>Добавить Ссылку</Button>
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