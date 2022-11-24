export const addPeople = "INSERT INTO people (type, name, name_ru, name_uz, position, position_ru, position_uz, work_hours, work_hours_ru, work_hours_uz,phone, email,tg, biography,biography_ru, biography_uz, work_history, duty,is_boss,url ) VALUES(?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
export const updatePeople = "UPDATE people SET type=?, name=?, name_ru=?, name_uz=?, position=?, position_ru=?, position_uz=?, work_hours=?, work_hours_ru=?, work_hours_uz=?,phone=?, email=?,tg=?, biography=?,biography_ru=?, biography_uz=?, work_history=?, duty=?,is_boss=?,url=? WHERE id=?";
export const getAllByType = "SELECT id,type, name, name_ru, name_uz, position, position_ru, position_uz, work_hours, work_hours_ru, work_hours_uz,phone, email,tg, biography, work_history as workHistory, duty,is_boss,url FROM people WHERE type=?";
export const getAllByTypeRu = "SELECT id,type, name_ru as name, position_ru as position, work_hours_ru as workHours, phone, email,tg, biography_ru as biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE type=?";
export const getAllByTypeUz = "SELECT id,type, name_uz as name, position_uz as position, work_hours_uz as workHours, phone, email,tg, biography_uz as biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE type=?";
export const getAllByTypeEn = "SELECT id, type, name, position, work_hours as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE type=?";

export const getAllById = "SELECT id,type, name, name_ru, name_uz, position, position_ru, position_uz, work_hours as workHours, work_hours_ru, work_hours_uz,phone, email,tg, biography, biography_ru,biography_uz,  work_history as workHistory, duty,is_boss,url FROM people WHERE id=?";
export const getAllByIdRu = "SELECT id,type, name_ru as name, position_ru as position, work_hours_ru as workHours, phone, email,tg, biography_ru as biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE id=?";
export const getAllByIdUz = "SELECT id,type, name_uz as name, position_uz as position, work_hours_uz as workHours, phone, email,tg, biography_uz as biography , work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE id=?";
export const getAllByIdEn = "SELECT id, type, name, position, work_hours as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE id=?";
export const deletePeopelById = "DELETE FROM people WHERE id=?";
