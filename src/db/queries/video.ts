export const addVideo =
  "INSERT INTO videos (title, title_ru, title_uz,link, url) VALUES(?,?,?,?,?)";
export const updateVideo =
  "UPDATE videos  SET title=?, title_ru=?,  title_uz=?, link=?,url=? WHERE id=?";

export const deleteVidoById = "DELETE FROM videos  WHERE ID = ?";

export const getEnVidoQuery =
  "SELECT id, title, description, link  FROM videos";
export const getRuVidoQuery =
  "SELECT id, title_ru as title, link, url FROM videos";
export const getUzVideoQuery =
  "SELECT id, title_uz as title,link, url FROM videos";
export const getVideoQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz,link, url FROM videos";
export const getVideoByIdQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, link, url FROM videos WHERE id = ?";
