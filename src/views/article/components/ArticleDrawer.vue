<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="80%" :title="`${drawerData.title}`">
		<v-md-editor
			v-model="text"
			height="100%"
			:disabled-menus="[]"
			@upload-image="handleUploadImage"
			:mode="drawerData.isView ? 'preview' : 'editable'"
		></v-md-editor>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { Article } from "@/api/interface";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { uploadImg } from "@/api/modules/upload";
interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: Article.ArticleList;
	apiUrl?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
const text = ref("");
// drawer框状态
const drawerVisible = ref(false);
const drawerData = ref<DrawerProps>({
	isView: false,
	title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
	drawerData.value = params;
	text.value = params.rowData?.article_body || "";
	drawerVisible.value = true;
};
const handleUploadImage = async (event: any, insertImage: any, files: any) => {
	let formData = new FormData();
	formData.append("file", files[0]);
	const { data } = await uploadImg(formData);
	insertImage({
		url: `${data!.fileUrl}`,
		desc: `${data!.fileUrl}`
	});
};
// 提交数据（新增/编辑）
// const ruleFormRef = ref<FormInstance>();
const handleSubmit = async () => {
	try {
		await drawerData.value.apiUrl!({
			id: drawerData.value.rowData?.id,
			article_body: text.value
		});
		ElMessage.success({ message: `${drawerData.value.title}文章成功！` });
		drawerData.value.getTableList!();
		drawerVisible.value = false;
	} catch (error) {
		console.log(error);
	}
	// });
};

defineExpose({
	acceptParams
});
</script>
