export const addOpinion = "INSERT INTO opinions(title, title_ru, title_uz, subtitle, subtitle_ru, subtitle_uz,text, text_ru, text_uz) VALUES(?,?,?,?,?,?,?,?,?)";
export const updateOpinion = "UPDATE opinions SET title=?, title_ru=?, title_uz=?, subtitle=?, subtitle_ru=?, subtitle_uz=?,text=?, text_ru=?, text_uz=? WHERE id=?";


export const getEnOpinionQuery =
  "SELECT id,  title, subtitle,text FROM opinions";
export const getRuOpinionQuery =
  "SELECT id, title_ru as title, subtitle_ru as subtitle,text_ru as text FROM opinions";
export const getUzOpinionQuery =
  "SELECT id, title_uz as title, subtitle_uz as subtitle,text_uz as text FROM opinions";
export const getOpinionQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, subtitle, subtitle_ru as subtitleRu, subtitle_uz  as subtitleUz,text, text_ru as textRu, text_uz as textUz FROM opinions";

export const deleteOpinionById = "DELETE FROM opinions WHERE id = ?";
export const getOpinionByIdQuery =
  "SELECT id, title, title_ru as titleRu, title_uz as titleUz, subtitle, subtitle_ru as subtitleRu, subtitle_uz as subtitleUz,text, text_ru as textRu, text_uz as textUz FROM opinions WHERE id=?";
