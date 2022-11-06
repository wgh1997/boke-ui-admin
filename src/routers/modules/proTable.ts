import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const proTableRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable",
		component: Layout,
		redirect: "/proTable/useHooks",
		meta: {
			title: "超级表格"
		},
		children: [
			{
				path: "/proTable/useHooks",
				name: "useHooks",
				component: () => import("@/views/proTable/useHooks/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "使用 Hooks",
					key: "useHooks"
				}
			},
			{
				path: "/proTable/useComponent",
				name: "useComponent",
				component: () => import("@/views/proTable/useComponent/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent"
				}
			},
			{
				path: "/proTable/useTreeFilter",
				name: "useTreeFilter",
				component: () => import("@/views/proTable/useTreeFilter/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "使用 TreeFilter",
					key: "useTreeFilter"
				}
			},
			{
				path: "/proTable/useSelectFilter",
				name: "useSelectFilter",
				component: () => import("@/views/proTable/useSelectFilter/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "使用 SelectFilter",
					key: "useSelectFilter"
				}
			}
		]
	}
];

export default proTableRouter;
