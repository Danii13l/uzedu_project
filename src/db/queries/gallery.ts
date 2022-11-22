export const addGalleryQuery =
  "INSERT INTO galleries (title, title_ru, title_uz, description, description_ru, description_uz, images) VALUES(?, ?, ?, ?, ?, ?, ?)";
export const editGalleryQuery =
  "UPDATE galleries SET title = ?, title_ru = ?, title_uz = ?, description = ?, description_ru = ?, description_uz = ?, images=?  WHERE id = ?";
export const ruQuery =
  "SELECT id, title_ru as title, description_ru as description, images,  created_at as createdAt FROM galleries";
export const uzQuery =
  "SELECT id, title_uz as title, description_uz as description, images,  created_at as createdAt FROM galleries";
export const fullQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu, description_uz as descriptionUz, images, created_at as createdAt FROM galleries";
export const enQuery =
  "SELECT id, title, description, images, created_at as createdAt FROM galleries";
export const deleteById = "DELETE FROM galleries WHERE id=?";
export const getGalaryById = "SELECT id, title, title_ru as titleRu, title_uz as titleUz, description, description_ru as descriptionRu, description_uz as descriptionUz, images,  created_at as createdAt FROM galleries WHERE id=?";
