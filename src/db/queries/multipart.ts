export const addMultipartBanner =
  "INSERT INTO multiparts(type, title, title_ru, title_uz, description, description_ru, description_uz, pupils, teachers, barkamol, houses, school,link, url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
export const getEnBanerQuery =
  "SELECT id,  title, description,pupils, teachers, barkamol, houses, school, url  FROM multiparts WHERE type = 'BANNER'";
export const getRuBannerQuery =
  "SELECT id, title_ru as title, description_ru as description, pupils, teachers, barkamol, houses, school, url FROM multiparts WHERE type = 'BANNER'";
export const getUzBannerQuery =
  "SELECT id, title_uz as title, description_uz as description,pupils, teachers, barkamol, houses, school, url FROM multiparts WHERE type = 'BANNER'";
export const getBannerQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz, pupils, teachers, barkamol, houses, school, url FROM multiparts WHERE type = 'BANNER'";

export const getEnSliderQuery =
  "SELECT id,  title, description,link, url  FROM multiparts WHERE type = 'SLIDER'";
export const getRuSliderQuery =
  "SELECT id, title_ru as title, description_ru as description,link, url FROM multiparts WHERE type = 'SLIDER'";
export const getUzSliderQuery =
  "SELECT id, title_uz as title, description_uz as description,link, url FROM multiparts WHERE type = 'SLIDER'";
export const getSliderQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz,link, url FROM multiparts WHERE type = 'SLIDER'";


  export const getByIdQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz,  pupils, teachers, barkamol, houses, school,link, url FROM multiparts WHERE id = ?";
export const deleteById = "DELETE from multiparts WHERE id = ?";

export const updateMultipartBanner =
  "UPDATE multiparts SET type =?, title=?, title_ru=?, title_uz=?, description=?, description_ru=?, description_uz=?, pupils=?, teachers=?, barkamol=?, houses=?, school=?,link=?, url=? WHERE id =?";



  export const getEnLinkQuery =
  "SELECT id,  title,link, url  FROM multiparts WHERE type = 'LINK'";
export const getRuLinkQuery =
  "SELECT id, title_ru as title, link, url FROM multiparts WHERE type = 'LINK'";
export const getUzLinkQuery =
  "SELECT id, title_uz as title, link, url FROM multiparts WHERE type = 'LINK'";
export const getLinkQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, link, url FROM multiparts WHERE type = 'LINK'";
