import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";
// 数据大屏模块
const articleRouter: Array<RouteRecordRaw> = [
	{
		path: "/article",
		component: Layout,
		redirect: "/article",
		children: [
			{
				path: "/article/List",
				name: "articleList",
				component: () => import("@/views/article/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "添加文章",
					key: "articleList"
				}
			},
			{
				path: "/article/tags",
				name: "articletags",
				component: () => import("@/views/article/tags/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "文章标签",
					key: "articletags"
				}
			},
			{
				path: "/article/classify",
				name: "articleclassify",
				component: () => import("@/views/article/classify/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "文章分类",
					key: "articleclassify"
				}
			}
		]
	}
];

export default articleRouter;
