<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="500px" :title="`${drawerData.title}用户`">
		<el-form
			ref="ruleFormRef"
			:rules="rules"
			:disabled="drawerData.isView"
			:model="drawerData.rowData"
			label-width="100px"
			label-suffix=" :"
			:hide-required-asterisk="drawerData.isView"
		>
			<el-form-item label="文章头像" prop="article_img">
				<UploadImg
					v-model:imageUrl="drawerData.rowData!.article_img"
					:disabled="drawerData.isView"
					:file-size="3"
					:upload-style="{ width: '130px', height: '130px' }"
					@check-validate="checkValidate('avatar')"
				>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="文章名称" prop="article_name">
				<el-input v-model="drawerData.rowData!.article_name" placeholder="请填写文章名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否置顶" prop="article_topping">
				<el-switch v-model="drawerData.rowData!.article_topping" active-value="0" inactive-value="1" />
			</el-form-item>
			<el-form-item label="文章类型" prop="article_type">
				<el-select v-model="drawerData.rowData!.article_type" placeholder="请填写文章类型">
					<el-option v-for="item in drawerData.options" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
				<!-- <el-input v-model="drawerData.rowData!.article_type" placeholder="文章类型" clearable></el-input> -->
			</el-form-item>
			<el-form-item label="tags" prop="tags">
				<el-input v-model="drawerData.rowData!.tags" placeholder="请填写tags" clearable></el-input>
			</el-form-item>
			<el-form-item label="创建时间" prop="create_time">
				<el-date-picker v-model="drawerData.rowData!.create_time" placeholder="请填写创建时间" type="date" />
			</el-form-item>
			<el-form-item label="修改时间" prop="revise_time">
				<el-date-picker v-model="drawerData.rowData!.revise_time" placeholder="请填写修改时间" type="date" />
			</el-form-item>
			<el-form-item label="阅读数量" prop="read">
				<el-input v-model="drawerData.rowData!.read" placeholder="请填写阅读数量" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { Article } from "@/api/interface";
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import UploadImg from "@/components/UploadImg/index.vue";
// import { getArticleClassify } from "@/api/modules/article";

const rules = reactive({
	avatar: [{ required: true, message: "请上传用户头像", trigger: "change" }],
	username: [{ required: true, message: "请填写用户姓名", trigger: "change" }],
	gender: [{ required: true, message: "请选择性别", trigger: "change" }],
	idCard: [{ required: true, message: "请填写身份证号", trigger: "change" }],
	email: [{ required: true, message: "请填写邮箱", trigger: "change" }],
	address: [{ required: true, message: "请填写居住地址", trigger: "change" }]
});
// const options: any = ref([]);
interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: Article.ArticleList;
	apiUrl?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
	options?: any;
}
// onMounted(async () => {
// 	const { data } = await getArticleClassify();
// 	options.value = data.datalist;
// });
// drawer框状态
const drawerVisible = ref(false);
const drawerData = ref<DrawerProps>({
	isView: false,
	title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
	drawerData.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await drawerData.value.apiUrl!(drawerData.value.rowData);
			ElMessage.success({ message: `${drawerData.value.title}文章成功！` });
			drawerData.value.getTableList!();
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

// 公共校验方法（图片上传成功触发重新校验）
const checkValidate = (val: string) => {
	ruleFormRef.value!.validateField(val, () => {});
};
defineExpose({
	acceptParams
});
</script>
