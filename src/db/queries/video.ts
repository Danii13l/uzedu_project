export const addVideo = "INSERT INTO videos (title, title_ru, title_uz, description, description_ru, description_uz,links) VALUES(?,?,?,?,?,?,?)";
export const updateVideo = "UPDATE videos  SET title=?, title_ru=?,  title_uz=?, description=?,  description_ru=?, description_uz=?, links=? WHERE id=?";





export const deleteVidoById = "DELETE FROM videos  WHERE ID = ?";

export const getEnVidoQuery =
  "SELECT id, title, description, links  FROM videos";
export const getRuVidoQuery =
  "SELECT id, title_ru as title, description_ru as description, links FROM videos";
export const getUzVideoQuery =
  "SELECT id, title_uz as title, description_uz as description, links FROM videos";
export const getVideoQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz, links FROM videos";
  export const getVideoByIdQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu,  description_uz as descriptionUz, links FROM videos WHERE id = ?";
  