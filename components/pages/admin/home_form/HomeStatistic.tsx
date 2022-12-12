import { FC, useEffect, useState } from "react";

import {
  statisticNumber,
  statisticNumberTitles,
} from "assets/constants/homeForm";

import { getAuthorizationHeader, myAxios } from "assets/axios/myAxios";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "next-i18next";

import { Button } from "@/components/common/button/Button";
import { FormActions } from "../form_items/FormActions";
import { FormWrapper } from "../form_items/FormWrapper";
import { InputsWrapper } from "../form_items/InputsWrapper";


import s from "./index.module.scss";
import { useRouter } from 'next/router';

export const HomeStatistic: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const [dataOut, setDataOut] = useState<{
    allAddr: string;
    checkedAddr: string;
    rejectedAddr: string;
    processAddr: string;
    allReq: string;
    checkedReq: string;
    processReq: string;
    id: number
  } | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await myAxios("/api/dashboard/statistic", {
          headers: {
            Authorization: getAuthorizationHeader()
          }
        });
        setDataOut(data.data[0]);
      } catch (err) { console.log(err); }
    })();
  }, []);

  return (
    <FormWrapper>
      <FormActions typeOfPage={"Статистика"} isDelete={false} />
      <Formik
        initialValues={{
          type: "STATISTIC",
          allAddr: dataOut?.allAddr ?? "",
          checkedAddr: dataOut?.checkedAddr ?? "",
          rejectedAddr: dataOut?.rejectedAddr ?? "",
          processAddr: dataOut?.processAddr ?? "",
          allReq: dataOut?.allReq ?? "",
          checkedReq: dataOut?.checkedReq ?? "",
          processReq: dataOut?.processReq ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (val) => {
          try {
            dataOut ? await myAxios.patch("/api/dashboard/statistic", { ...val, id: dataOut?.id }, {
              headers: {
                Authorization: getAuthorizationHeader()
              }
            }) : await myAxios.post("/api/dashboard/statistic", val, {
              headers: {
                Authorization: getAuthorizationHeader()
              }
            });
            await push("/admin");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputsWrapper title={t(`home:callstatistics`)}>
              <div className={s.statistic_wr}>
                {statisticNumber.slice(0, 4).map((item, index) => {
                  return (
                    <div key={item}>
                      <p className={s.banner_number_title}>
                        {t(`home:${statisticNumberTitles[index]}`)}
                      </p>
                      <Field name={item} className={"formik_input"} />
                    </div>
                  );
                })}
              </div>
            </InputsWrapper>

            <InputsWrapper title={t(`home:requestproces`)}>
              <div className={s.statistic_wr}>
                {statisticNumber.slice(4).map((item, index) => {
                  return (
                    <div key={item}>
                      <p className={s.banner_number_title}>
                        {t(`home:${statisticNumberTitles[index + 4]}`)}
                      </p>
                      <Field name={item} className={"formik_input"} />
                    </div>
                  );
                })}
              </div>
            </InputsWrapper>
            <Button classN={"main"} submit={true}>
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </FormWrapper >
  );
};
