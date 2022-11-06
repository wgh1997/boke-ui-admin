<template>
	<div class="table-box">
		<div class="card table-search" v-show="isShowSearch">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="用户姓名 :">
					<el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="性别 :">
					<el-select v-model="searchParam.gender" placeholder="请选择" clearable>
						<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号 :">
					<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="邮箱 :">
					<el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<div style="display: inline" v-show="searchShow">
					<el-form-item label="创建时间 :">
						<el-date-picker
							v-model="searchParam.createTime"
							type="datetimerange"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="YYYY-MM-DD HH:mm:ss"
						/>
					</el-form-item>
				</div>
			</el-form>
			<div class="search-operation">
				<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
				<el-button :icon="Delete" @click="reset">重置</el-button>
				<el-button type="primary" link class="search-isOpen" @click="searchShow = !searchShow">
					{{ searchShow ? "合并" : "展开" }}
					<el-icon class="el-icon--right">
						<component :is="searchShow ? ArrowUp : ArrowDown"></component>
					</el-icon>
				</el-button>
			</div>
		</div>
		<div class="card table-box">
			<div class="table-header">
				<div class="header-button-lf">
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
					<el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete"> 批量删除 </el-button>
				</div>
				<div class="header-button-ri">
					<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
					<el-button :icon="Search" circle @click="isShowSearch = !isShowSearch"> </el-button>
				</div>
			</div>
			<el-table :data="tableData" :border="true" @selection-change="selectionChange" :row-key="getRowKeys">
				<el-table-column type="selection" reserve-selection align="center" width="80" />
				<el-table-column prop="article_name" label="文章名称" align="center" width="400"></el-table-column>
				<el-table-column prop="article_tags" label="tags" show-overflow-tooltip align="center" width="300" v-slot="scope">
					<Tags :options="options_tags" :article_id="scope.row.id" :article_tags="scope.row.article_tags"></Tags>
				</el-table-column>
				<el-table-column prop="article_topping" label="是否置顶" align="center" v-slot="scope">
					{{ scope.row.article_topping == 0 ? "是" : "否" }}
				</el-table-column>
				<el-table-column prop="article_type" label="文章类型" show-overflow-tooltip align="center" v-slot="scope">
					{{
						options.find(function (item: any) {
							return item.id === scope.row.article_type;
						})?.name || "--"
					}}
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间" show-overflow-tooltip align="center" width="200"></el-table-column>
				<el-table-column prop="revise_time" label="修改时间" show-overflow-tooltip align="center" width="200"></el-table-column>
				<el-table-column prop="read" label="阅读数量" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column label="操作" fixed="right" width="310" align="center" v-slot="scope">
					<el-button type="primary" link :icon="View" @click="articleDrawer('查看', scope.row)">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="articleDrawer('编辑文章', scope.row)">编辑文章</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
					<!-- <span v-if="!BUTTONS.view && !BUTTONS.edit && !BUTTONS.reset && !BUTTONS.delete">--</span> -->
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
			<!-- @current-change="handleCurrentChange" -->
		</div>
		<UserDrawer ref="drawerRef" />
		<ArticleDrawer ref="articleRef"></ArticleDrawer>
	</div>
</template>

<script setup lang="ts" name="useHooks">
import { ref, reactive, onMounted } from "vue";
import { genderType } from "@/utils/serviceDict";
import { Article } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useSelection } from "@/hooks/useSelection";
import { useTable } from "@/hooks/useTable";
import UserDrawer from "@/views/article/components/UserDrawer.vue";
import ArticleDrawer from "@/views/article/components/ArticleDrawer.vue";
import Tags from "@/views/article/components/Tags.vue";

import { getArticleClassify, getArticleTags } from "@/api/modules/article";
import { Refresh, CirclePlus, Delete, Search, EditPen, ArrowDown, ArrowUp, View } from "@element-plus/icons-vue";
import { postarticleList, getarticleList, putarticleList, deletearticleList, postArticleListBody } from "@/api/modules/article";
const options: any = ref([]);
const options_tags: any = ref([]);

// 是否展示搜索模块
const isShowSearch = ref(false);

// 是否展示更多搜索内容
const searchShow = ref(false);

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	// type: 1
});

// 表格 hooks
const { tableData, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTable(
	getarticleList,
	initParam
);

// 数据多选 hooks
const { isSelected, selectedListIds, selectionChange, getRowKeys } = useSelection();

// 设置搜索表单默认参数
// searchInitParam.value = {  };

// 删除
const deleteAccount = async (params: Article.ArticleList) => {
	await useHandleData(deletearticleList, { id: params.id }, `删除【${params.article_name}】`);
	getTableList();
};

// 批量删除
const batchDelete = async () => {
	await useHandleData(deletearticleList, { id: selectedListIds.value }, "删除所选信息");
	getTableList();
};
onMounted(async () => {
	const { data } = await getArticleClassify();
	const data_tags = await getArticleTags();
	options.value = data.datalist;
	options_tags.value = data_tags.data!.datalist;
});
// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const articleRef = ref();
const articleDrawer = (title: string, rowData: Partial<Article.ArticleList> = {}) => {
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: postArticleListBody,
		getTableList
	};
	articleRef.value.acceptParams(params);
};
const openDrawer = (title: string, rowData: Partial<Article.ArticleList> = {}) => {
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: title === "新增" ? postarticleList : title === "编辑" ? putarticleList : "",
		getTableList,
		options: options.value as []
	};
	drawerRef.value.acceptParams(params);
};
</script>
