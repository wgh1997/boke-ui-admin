<template>
	<div class="table-box">
		<div class="card table-box">
			<div class="table-header">
				<div class="header-button-lf">
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
					<!-- <el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete"> 批量删除 </el-button> -->
				</div>
				<div class="header-button-ri">
					<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
					<el-button :icon="Search" circle @click="isShowSearch = !isShowSearch"> </el-button>
				</div>
			</div>
			<el-table :data="tableData" :border="true">
				<el-table-column prop="name" label="分类名称" align="center"></el-table-column>
				<el-table-column label="操作" fixed="right" width="230" align="center" v-slot="scope">
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</el-table-column>
				<template #empty>
					<div class="table-empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</div>
				</template>
			</el-table>
			<el-pagination
				:currentPage="pageable.pageNum"
				:page-size="pageable.pageSize"
				:page-sizes="[10, 25, 50, 100]"
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageable.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
		<ClassifyDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="ts" name="useHooks">
import { ref, reactive } from "vue";
import { Article } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
// import { useSelection } from "@/hooks/useSelection";
import { useTable } from "@/hooks/useTable";
import ClassifyDrawer from "@/views/article/components/ClassifyDrawer.vue";
import { Refresh, CirclePlus, Delete, Search, EditPen } from "@element-plus/icons-vue";
import { postArticleClassify, getArticleClassify, putArticleClassify, deleteArticleClassify } from "@/api/modules/article";

// 是否展示搜索模块
const isShowSearch = ref(false);

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	// type: 1
});

// 表格 hooks
const { tableData, pageable, getTableList, handleSizeChange, handleCurrentChange } = useTable(getArticleClassify, initParam);

// 数据多选 hooks
// const { isSelected, selectionChange, getRowKeys } = useSelection();

// 设置搜索表单默认参数
// searchInitParam.value = {  };

// 删除
const deleteAccount = async (params: Article.Classify) => {
	await useHandleData(deleteArticleClassify, { id: params.id }, `删除【${params.name}】`);
	getTableList();
};

// 批量删除
// const batchDelete = async () => {
// 	await useHandleData(deleteArticleClassify, { id: selectedListIds.value }, "删除所选信息");
// 	getTableList();
// };

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: Partial<Article.ArticleList> = {}) => {
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: title === "新增" ? postArticleClassify : title === "编辑" ? putArticleClassify : "",
		getTableList
	};
	drawerRef.value.acceptParams(params);
};
</script>
