export const createPage =
  "INSERT INTO pages (menu_id, sub_menu_id, title, title_ru, title_uz, description, description_ru, description_uz, images, videos, files ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
export const getById = "SELECT * FROM pages where id = ?";
export const updatePage =
  "UPDATE pages SET title = ?, title_ru = ?, title_uz = ?, description = ?, description_ru = ?, description_uz = ?, images = ?, videos = ?, files = ? WHERE id = ?";
export const getEnPageQuery =
    "SELECT id, menu_id as menuId, sub_menu_id as subMenuId, title, description, images, videos, files  FROM pages WHERE menu_id = ? AND sub_menu_id = ?";
export const getRuPageQuery =
  "SELECT id, menu_id as menuId, sub_menu_id as subMenuId, title_ru as title, description_ru as description, images, videos, files FROM pages WHERE menu_id = ? AND sub_menu_id = ?";
export const getUzPageQuery =
  "SELECT id, menu_id as menuId, sub_menu_id as subMenuId, title_uz as title, description_uz as description, images, videos, files FROM pages WHERE menu_id = ? AND sub_menu_id = ?";
export const getPageQuery =
  "SELECT id, menu_id as menuId, sub_menu_id as subMenuId, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz, images, videos, files FROM pages WHERE menu_id = ? AND sub_menu_id = ?";
export const deletePageQuery = "DELETE FROM pages WHERE id = ?";
export const getByIdPageQuery =
  "SELECT id, menu_id as menuId, sub_menu_id as subMenuId, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz, images, videos, files FROM pages WHERE id = ?";
