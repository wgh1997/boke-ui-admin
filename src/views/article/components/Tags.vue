<template>
	<el-tag v-for="tag in dynamicTags" :key="tag.id" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
		{{ tag.name }}
	</el-tag>
	<el-select v-if="inputVisible" v-model="inputValue" class="m-2" placeholder="Select" size="small" @change="handleInputConfirm">
		<el-option v-for="item in props.options" :key="item.id" :label="item.name" :value="item.id" />
	</el-select>
	<el-button v-else class="button-new-tag ml-1" size="small" @click="showInput"> + Tag </el-button>
</template>

<script lang="ts" setup name="Tags">
import { nextTick, ref } from "vue";
import { ElInput } from "element-plus";
import { postTagsArtic, deleteTagsArtic, getTagsArtic } from "@/api/modules/article";
interface TagsType {
	name: string;
	id: string;
}
interface Props {
	options: any;
	// eslint-disable-next-line vue/prop-name-casing
	article_id: string;
	// eslint-disable-next-line vue/prop-name-casing
	article_tags: any;
}
const props = withDefaults(defineProps<Props>(), {
	options: [],
	article_id: "",
	article_tags: []
});
const inputValue = ref("");
const dynamicTags = ref<TagsType[]>(props.article_tags);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = async (tag: any) => {
	const { code } = await deleteTagsArtic({ id: tag.id });
	if (code !== 0) return;
	dynamicTags.value.splice(
		dynamicTags.value.findIndex(i => i.id == tag.id),
		1
	);
};

const showInput = () => {
	inputVisible.value = true;
	nextTick(() => {
		InputRef.value!.input!.focus();
	});
};

const handleInputConfirm = async (): Promise<void> => {
	if (inputValue.value) {
		const { code } = await postTagsArtic({
			article_id: props.article_id,
			tags_id: inputValue.value
		});
		if (code !== 0) return;
		const { data } = await getTagsArtic({ article_id: props.article_id });
		console.log(data.datalist);
		dynamicTags.value = data.datalist;
	}
	inputVisible.value = false;
	inputValue.value = "";
};
</script>
<style scoped lang="scss">
.el-tag.is-closable {
	margin-right: 5px;
}
.el-select {
	width: 100px;
}
</style>
