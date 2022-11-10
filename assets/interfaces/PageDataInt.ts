export  interface PageInt {
    id: number;
    menuId: number;
    subMenuId: 1;
    title: string;
    description: string;
    images: { title: string; url: string }[];
    videos: { title: string; url: string }[];
    files: { title: string; url: string }[]
}