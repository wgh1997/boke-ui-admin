import { Article, ReqPage, TagsArtic, Result } from "@/api/interface/index";

import http from "@/api";

/**
 * @name 文章模块
 */
export const postarticleList = (params: Article.ArticleList) => {
	return http.post<any>(`article/list`, params);
};
export const getarticleList = (params: any) => {
	return http.get<any>(`article/list`, params);
};
export const putarticleList = (params: Article.ArticleList) => {
	return http.put<any>(`article/list`, params);
};
export const deletearticleList = (params: any) => {
	return http.delete<any>(`article/list`, params);
};
export const postArticleListBody = (params: Article.ArticleList) => {
	return http.post<any>(`article/list_body`, params);
};
// 文章分类接口
export const getArticleClassify = (params?: ReqPage) => {
	return http.get<any>(`article/classify`, params);
};
export const putArticleClassify = (params: Article.Classify) => {
	return http.put<any>(`article/classify`, params);
};
export const postArticleClassify = (params: Article.Classify) => {
	return http.post<any>(`article/classify`, params);
};
export const deleteArticleClassify = (params: any) => {
	return http.delete<any>(`article/classify`, params);
};

// 文章标签接口
export const getArticleTags = (params?: ReqPage) => {
	return http.get<any>(`article/tags`, params);
};
export const putArticleTags = (params: Article.Classify) => {
	return http.put<any>(`article/tags`, params);
};
export const postArticleTags = (params: Article.Classify) => {
	return http.post<any>(`article/tags`, params);
};
export const deleteArticleTags = (params: any) => {
	return http.delete<any>(`article/tags`, params);
};

// 文章标签接口
export const getTagsArtic = (params?: TagsArtic.SetTagsArtic) => {
	return http.get<any>(`article/tags_artic`, params);
};
// export const putTagsArtic = (params: Article.Classify) => {
// 	return http.put<any>(`article/tags_artic`, params);
// };
export const postTagsArtic = (params: TagsArtic.SetTagsArtic) => {
	return http.post<any>(`article/tags_artic`, params);
};
export const deleteTagsArtic = (params: TagsArtic.SetTagsArtic) => {
	return http.delete<Result>(`article/tags_artic`, params);
};
