import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}&count=${99999}`, { filters: [] });

export const queryAreaByApi = () => request.post(`/dataservice/test/api?api_id=1bd16ede-9bf6-4759-8c58-7fbdce1e2158`, {});

export const jsSdkConfig = (url) => request.get(`ext/js-sdk?url=${url}`);

export const queryAddress = (loglat) => request.get(`ext/locating/queryAddressByCoordinate?coordinate=${loglat}`);
