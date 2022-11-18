export const addPeople = "INSERT INTO people (type, name, name_ru, name_uz, position, position_ru, position_uz, work_hours, work_hours_ru, work_hours_uz,phone, email,tg, biography, work_history, duty,is_boss,url ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
export const updatePeople = "UPDATE people SET type=?, name=?, name_ru=?, name_uz=?, position=?, position_ru=?, position_uz=?, work_hours=?, work_hours_ru=?, work_hours_uz=?,phone=?, email=?,tg=?, biography=?, work_history=?, duty=?,is_boss=?,url=? WHERE id=?";

export const getAllByType = "SELECT type, name, name_ru, name_uz, position, position_ru, position_uz, work_hours, work_hours_ru, work_hours_uz,phone, email,tg, biography, work_history as workHistory, duty,is_boss,url FROM people WHERE type=?";
export const getAllByTypeRu = "SELECT type, name_ru as name, position_ru as position, work_hours_ru as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE type=?";
export const getAllByTypeUz = "SELECT type, name_uz as name, position_uz as position, work_hours_uz as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE type=?";
export const getAllByTypeEn = "SELECT type, name, position, work_hours as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE type=?";


export const getAllById = "SELECT type, name, name_ru, name_uz, position, position_ru, position_uz, work_hours as workHours, work_hours_ru, work_hours_uz,phone, email,tg, biography, work_history as workHistory, duty,is_boss,url FROM people WHERE id=?";
export const getAllByIdRu = "SELECT type, name_ru as name, position_ru as position, work_hours_ru as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE id=?";
export const getAllByIdUz = "SELECT type, name_uz as name, position_uz as position, work_hours_uz as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE id=?";
export const getAllByIdEn = "SELECT type, name, position, work_hours as workHours, phone, email,tg, biography, work_history as workHistory, duty, is_boss as isBoss, url FROM people WHERE id=?";

export const deletePeopelById = "DELETE FROM position WHERE id=?";
