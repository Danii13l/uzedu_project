export const headerTopLinks = [
    {
        id: 1,
        text: "header:vacancies",
        link: "#"
    },
    {
        id: 2,
        text: "header:projects",
        link: "#"
    },
    {
        id: 3,
        text: "header:faq",
        link: "#"
    },
    {
        id: 4,
        text: "header:statesymbol",
        link: "#"
    },
    {
        id: 5,
        text: "header:addressofcitizen",
        link: "#"
    }];


export const headerBottomLinks = [
    {
        id: 1, text: "header:ministry", link: "#", sublinks: [
            {id: 1, text: "header:aboutminstry", link: "#"},
            {id: 2, text: "header:leaders", link: "#"},
            {id: 3, text: "header:centraloffice", link: "#"},
            {id: 4, text: "header:teradmin", link: "#"},
            {id: 5, text: "header:suborgan", link: "#"},
            {id: 6, text: "header:coorвadvbodies", link: "#"},
            {id: 7, text: "header:structurecentmin", link: "#"},
            {id: 8, text: "header:requisites", link: "#"},
            {id: 9, text: "header:goals", link: "#"},
            {id: 10, text: "header:contacts", link: "#"},
        ]
    },
    {
        id: 2, text: "header:documents", link: "#", sublinks: []
    },
    {
        id: 3, text: "header:education", link: "#", sublinks: [
            {id: 1, text: "header:statistics", link: "#"},
            {id: 2, text: "header:analyticaldata", link: "#"},
            {id: 3, text: "header:elibrary", link: "#"},
            {id: 4, text: "header:Approximaterecommen", link: "#"},
            {id: 5, text: "header:Childcenter", link: "#"},
            {id: 6, text: "header:disabilities", link: "#"},
        ]
    },
    {
        id: 4, text: "header:performance", link: "#", sublinks: [
            {id: 1, text: "header:registerserv", link: "#"},
            {id: 2, text: "header:projecte", link: "#"},
            {id: 3, text: "header:fightingcor", link: "#"},
            {id: 4, text: "header:actionstrategy", link: "#"},
            {id: 5, text: "header:genderequality", link: "#"},
            {id: 6, text: "header:tenders", link: "#"},
            {id: 7, text: "header:workplan", link: "#"},
            {id: 8, text: "header:shedulemeetings", link: "#"},
            {id: 9, text: "header:checkingactivities", link: "#"},
            {id: 10, text: "header:reports", link: "#"},
            {id: 11, text: "header:investmentpotential", link: "#"},
            {id: 12, text: "header:Workwithapplications", link: "#"},
        ]
    },
    {
        id: 5, text: "header:informationService", link: "#", sublinks: [
            {id: 1, text: "header:ministrynews", link: "#"},
            {id: 2, text: "header:pressreleases", link: "#"},
            {id: 3, text: "header:massmediaaboutus", link: "#"},
            {id: 4, text: "header:logobrandguide", link: "#"},
            {id: 5, text: "header:gallery", link: "#"},
            {id: 6, text: "header:videogallery", link: "#"},
            {id: 7, text: "header:pressconference", link: "#"},
            {id: 8, text: "header:pressservice", link: "#"},
            {id: 9, text: "header:assistance", link: "#"},
            {id: 10, text: "header:сonferences", link: "#"},
            {id: 11, text: "header:contests", link: "#"},
            {id: 12, text: "header:accreditation", link: "#"},
            {id: 13, text: "header:Opennessministry", link: "#"},
            {id: 14, text: "header:statements", link: "#"},
            {id: 15, text: "header:infographics", link: "#"},
        ]
    },
    {
        id: 6, text: "header:opendata", link: "#", sublinks: [
            {id: 1, text: "header:openbudget", link: "#"},
            {id: 2, text: "header:opendataDP", link: "#"},
            {id: 3, text: "header:setofopendata", link: "#"},
        ]
    },

]


export const headerBottomLinksSidebar = [...headerBottomLinks.filter(item => item.id !== 2), {
    id: 2, text: "header:documents", link: "#", sublinks: []
}]
