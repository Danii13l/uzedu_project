export interface HomePageInt {
    banner: {
        title: string,
        titleRu: string,
        titleUz: string,
        description: string,
        descriptionRu: string,
        descriptionUz: string,
        pupils: string,
        teachers: string,
        barkamol: string,
        houses: string,
        school: string,
        url: string,
    },
    slider: {
        title: string,
        titleRu: string,
        titleUz: string,
        description: string,
        descriptionRu: string,
        descriptionUZ: string,
        link: string,
        url: string
    }[],
    opinion: {
        title: string,
        titleRu: string,
        titleUz: string,
        subtitle: string,
        subtitleRu: string,
        subtitleUz: string,
        text: string,
        textRu: string,
        textUz: string
    }[],
    statistic: {
        allAddr: string,
        checkedAddr: string,
        rejectedAddr: string,
        processAddr: string,
        allReq: string,
        checkedReq: string,
        processReq: string
    },
    usefulLinks: {
        title: string,
        titleRu: string,
        titleUz: string,
        link: string,
        url: string
    }[]
}

export const bannerNumber = ["pupils", "teachers", "barkamol", "houses", "school"];
export const bannerNumberTitles = ["pupils", "teachers", "barkamloSchools", "mercyHouses", "schools"];

export const statisticNumber = ["allAddr", "checkedAddr", "rejectedAddr", "processAddr", "allReq", "checkedReq", "processReq"];
export const statisticNumberTitles = ["totalappeals", "appealsconsidered", "rejectedrequests", "inconsideration", "numberofrequests", "reviewedrequests", "underconsideration"];

export const valuePushSlider = {
    title: "",
    titleRu: "",
    titleUz: "",
    description: "",
    descriptionRu: "",
    descriptionUZ: "",
    link: "",
    url: ""
};


export const valuePushOpinions = {
    title: "",
    titleRu: "",
    titleUz: "",
    subtitle: "",
    subtitleRu: "",
    subtitleUz: "",
    text: "",
    textRu: "",
    textUz: ""
};

export const valuePushUsefulLinks = {
    title: "",
    titleRu: "",
    titleUz: "",
    link: "",
    url: ""
};