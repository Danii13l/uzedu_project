export const getMenu = "SELECT id, name FROM menu";
export const getSubMenu = "SELECT id, name, menu_id as menuId, is_gallery as typeOfForm, page_link as pageLink FROM sub_menu";