import {
  ProviderLevel,
  ProviderLocation,
  ProviderRateType,
  ProviderStatus,
  ProviderType,
  ProviderWeekday,
  ProviderWorkWeekday,
} from "../../enums/provider.enum";
import { Direction } from "../../enums/common.enum";

export interface ProviderPostInput {
  providerType: ProviderType;
  providerLocation: ProviderLocation;
  providerWorkWeekday: ProviderWorkWeekday;
  providerWeekday?: ProviderWeekday[];
  providerRateType: ProviderRateType;
  providerWorkDayLimit: number;
  providerStartTime: string;
  providerEndTime: string;
  providerAddress: string;
  providerTitle: string;
  providerWorkPrice: number;
  providerImages: string[];
  providerDesc?: string;
  memberId?: string;
}

/** PROVIDER JOB POST SORTS **/
export interface WorkTime {
  start: string;
  end: string;
}

export interface WorkPrice {
  start: number;
  end: number;
}

interface PISearch {
  memberId?: string;
  locationList?: ProviderLocation[];
  typeList?: ProviderType[];
  levelList?: ProviderLevel[];
  workWeekdayList?: ProviderWorkWeekday[];
  weekList?: ProviderWeekday[];
  rateRangeList?: ProviderRateType[];
  options?: number[];
  workTimeRange?: WorkTime;
  workPrice?: WorkPrice;
  text?: string;
}

export interface ProviderJobsInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search: PISearch;
}

interface APISearch {
  providerStatus?: ProviderStatus;
}

export interface ProviderMemberInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search: APISearch;
}

/** ADMIN **/
interface ALPISearch {
  providerStatus?: ProviderStatus;
  providerLocationList?: ProviderLocation[];
}

export interface AllProviderJobsInquiry {
  page: number;
  limit: number;
  sort?: string;
  directions?: Direction;
  search: ALPISearch;
}

export interface OrdinaryInquiry {
  page: number;
  limit: number;
}
