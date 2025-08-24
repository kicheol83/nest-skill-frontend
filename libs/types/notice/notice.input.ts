import { Direction } from "@/libs/enums/common.enum";
import { NoticeCategory, NoticeStatus } from "@/libs/enums/notice.enum";

export interface CreateNotice {
	noticeCategory: NoticeCategory;
	noticeTitle: string;
	noticeContent: string;
	memberId?: string;
}

class NOTearch {
	noticeTitle?: string;
	noticeContent?: string;
	noticeCategory?: NoticeCategory[];
	noticeStatus?: NoticeStatus[];
	memberId?: string;
}

export interface NoticeInquiry {
	page: number;
	limit: number;
	sort?: string;
	directions?: Direction;
	search?: NOTearch;
}
