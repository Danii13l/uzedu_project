export const addStatistic = "INSERT INTO statistics(all_addr, checked_addr,  rejected_addr, process_addr,  all_req, checked_req, process_req) VALUES(?,?,?,?,?,?,?)";
export const updateStastic = "UPDATE statistics SET all_addr=?, checked_addr=?,  rejected_addr=?, process_addr=?,  all_req=?, checked_req=?, process_req=? WHERE id=?";
export const getAllStatistics = "SELECT id, all_addr as allAddr, checked_addr as checkedAddr,  rejected_addr as rejectedAddr, process_addr as processAddr,  all_req as allReq, checked_req as checkedReq, process_req as processReq FROM statistics";
export const getStatisticById = "SELECT id, all_addr as allAddr, checked_addr as checkedAddr,  rejected_addr as rejectedAddr, process_addr as processAddr,  all_req as allReq, checked_req as checkedReq, process_req as processReq FROM statistics WHERE id=?";
export const deleteById = "DELETE FROM statistics WHERE ID = ?";