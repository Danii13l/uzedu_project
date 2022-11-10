import {HomePageInt} from "../constants/homeForm";

export const getInitValueHomeForm = (data: HomePageInt | null) => {
    return {
        banner: data?.banner ?? {
            title: "",
            titleRu: "",
            titleUz: "",
            description: "",
            descriptionRu: "",
            descriptionUz: "",
            pupils: "",
            teachers: "",
            barkamol: "",
            houses: "",
            school: "",
            url: null,
        },
        slider: data?.slider ?? [],
        opinion: data?.opinion ?? [],
        statistic: data?.statistic ?? {
            allAddr: "",
            checkedAddr: "",
            rejectedAddr: "",
            processAddr: "",
            allReq: "",
            checkedReq: "",
            processReq: ""
        },
        usefulLinks: data?.usefulLinks ?? []
    };
};