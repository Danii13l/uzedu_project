export const ruInformationSearchQuery = (value: string) => {
  return `SELECT id,type, title_ru as title, description_ru as description, url FROM information WHERE title_ru LIKE '%${value}%' OR description_ru LIKE '%${value}%'`;
};
export const uzInformationSearchQuery = (value: string) => {
  return `SELECT id,type, title_uz as title, description_uz as description, url FROM information WHERE title_uz LIKE '%${value}%' OR description_uz LIKE '%${value}%'`;
};

export const enInformationSearchQuery = (value: string) => {
  return `SELECT id, type, title, description, url FROM information WHERE title LIKE '%${value}%' OR description_uz LIKE '%${value}%'`;
};
