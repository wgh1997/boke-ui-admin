import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 首页模块
const taskRouter: Array<RouteRecordRaw> = [
	{
		path: "/task/index",
		component: Layout,
		redirect: "/task/index",
		children: [
			{
				path: "/task/index",
				name: "task",
				component: () => import("@/views/task/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "定时任务",
					key: "task"
				}
			}
		]
	}
];

export default taskRouter;
