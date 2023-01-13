import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = (id, dataForm) => request.post(`/asset/getAssetData?asset_id=${id}`, { filters: dataForm });
