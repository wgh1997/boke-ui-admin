// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg?: string;
	message: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}
export interface DataPage {
	datalist: [];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[key: string]: any;
	}
}

// * 用户管理模块
export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		age: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		children?: ResUserList[];
	}
	export interface ResStatus {
		userLabel: string;
		userValue: number;
	}
	export interface ResGender {
		genderLabel: string;
		genderValue: number;
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}

export namespace Article {
	export interface ArticleList {
		article_name: string;
		article_topping: string;
		article_type: string;
		tags: string[];
		create_time: string;
		revise_time: string;
		read: number;
		article_body: string;
		article_img: string;
		id: string;
	}
	export interface Classify {
		name: string;
		user_id: string;
		id: string;
	}
}
export namespace TagsArtic {
	export interface SetTagsArtic {
		article_id?: string;
		tags_id?: string;
		id?: string;
	}
}

export namespace TaskArtic {
	export interface rowData {
		name: string;
		minute: string;
		hour: string;
		day_of_week: string;
		day_of_month: string;
		month_of_year: string;
		enabled: boolean;
	}
	export interface deleteData {
		name: string;
	}
	export interface PutData {
		name: string;
		enabled: boolean;
	}
}
