<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="500px" :title="`${drawerData.title}`">
		<el-form
			ref="ruleFormRef"
			:rules="rules"
			:disabled="drawerData.isView"
			:model="drawerData.rowData"
			label-width="100px"
			label-suffix=" :"
			:hide-required-asterisk="drawerData.isView"
		>
			<el-form-item label="任务名称" prop="name">
				<el-input v-model="drawerData.rowData!.name" placeholder="请填写任务名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="分钟" prop="minute">
				<el-input v-model="drawerData.rowData!.minute" placeholder="请填写分钟" clearable></el-input>
			</el-form-item>
			<el-form-item label="小时" prop="hour">
				<el-input v-model="drawerData.rowData!.hour" placeholder="请填写小时" clearable></el-input>
			</el-form-item>
			<el-form-item label="星期几" prop="day_of_week">
				<el-input v-model="drawerData.rowData!.day_of_week" placeholder="请填写星期几" clearable></el-input>
			</el-form-item>
			<el-form-item label="几号" prop="day_of_month">
				<el-input v-model="drawerData.rowData!.day_of_month" placeholder="请填写分钟" clearable></el-input>
			</el-form-item>
			<el-form-item label="月" prop="month_of_year">
				<el-input v-model="drawerData.rowData!.month_of_year" placeholder="请填写分钟" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否开启" prop="enabled">
				<el-switch v-model="drawerData.rowData!.enabled" class="ml-2" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerData.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { TaskArtic } from "@/api/interface";
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
	name: [{ required: true, message: "请填写名称", trigger: "change" }],
	minute: [{ required: true, message: "请填写分", trigger: "change" }],
	hour: [{ required: true, message: "请填写小时", trigger: "change" }],
	day_of_week: [{ required: true, message: "请填写星期几", trigger: "change" }],
	day_of_month: [{ required: true, message: "请填写几号", trigger: "change" }],
	month_of_year: [{ required: true, message: "请填写月", trigger: "change" }],
	enabled: [{ required: true, message: "请填写是否开启", trigger: "change" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: TaskArtic.rowData;
	apiUrl?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

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
			ElMessage.success({ message: `${drawerData.value.title}成功！` });
			console.log(drawerData.value);
			drawerData.value.getTableList!();
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};
defineExpose({
	acceptParams
});
</script>
