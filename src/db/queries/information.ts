export const addInformationQuery =
  "INSERT INTO information (type,title, title_ru, title_uz, description, description_ru, description_uz, url) VALUES(?,?, ?, ?, ?, ?, ?, ?)";
export const editInformationQuery =
  "UPDATE information SET title = ?, title_ru = ?, title_uz = ?, description = ?, description_ru = ?, description_uz = ?, url=?  WHERE id = ?";
export const ruInformationQuery =
  "SELECT id,type, title_ru as title, description_ru as description, url, created_at as createdAt FROM information WHERE type=?  ORDER BY created_at DESC LIMIT ? OFFSET ?";
export const uzInformationQuery =
  "SELECT id,type, title_uz as title, description_uz as description, url, created_at as createdAt FROM information WHERE type=?  ORDER BY created_at DESC  LIMIT ? OFFSET ? ";
export const fullInformationQuery =
  "SELECT id,type, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu, description_uz as descriptionUz, url, created_at as createdAt FROM  ORDER BY created_at DESC information WHERE type=?  LIMIT ? OFFSET ? ";
export const enInformationQuery =
  "SELECT id,type, title, description, url, created_at as createdAt FROM information WHERE type=?  ORDER BY created_at DESC  LIMIT ? OFFSET ? ";
export const deleteInformationById = "DELETE FROM information WHERE id=?";
export const getInformationById =
  "SELECT id,type, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu, description_uz as descriptionUz, url, created_at as createdAt  FROM information WHERE id=?";

  export const informationTypeCountQuery =
  "SELECT count(*) as value, type FROM information WHERE type=?";

  export const getInformationRuById =
  "SELECT id,type, title_ru as title, description_ru as description, url, created_at as createdAt  FROM information WHERE id=?";

  export const getInformationUzById =
  "SELECT id,type, title_uz as title, description_uz as description, url, created_at as createdAt  FROM information WHERE id=?";

  export const getInformationEnById =
  "SELECT id,type, title,description, url, created_at as createdAt  FROM information WHERE id=?";

