import { ReqPage, ResultData, DataPage, TaskArtic } from "@/api/interface/index";

import http from "@/api";
export const getTagsArtic = (params?: ReqPage) => {
	return http.get<ResultData<DataPage>>(`article/task`, params);
};
export const putTask = (params: TaskArtic.PutData) => {
	return http.put<ResultData>(`article/task`, params);
};
export const postTagsArtic = (params: TaskArtic.rowData) => {
	return http.post<ResultData>(`article/task`, params);
};
export const deleteTask = (params: TaskArtic.deleteData) => {
	return http.delete<ResultData>(`article/task`, params);
};
