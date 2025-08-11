import {
  ProviderLevel,
  ProviderLocation,
  ProviderRateType,
  ProviderStatus,
  ProviderType,
  ProviderWeekday,
  ProviderWorkWeekday,
} from "../../enums/provider.enum";

export interface ProviderPostUpdate {
  _id: string;
  providerType?: ProviderType;
  providerStatus?: ProviderStatus;
  providerLocation?: ProviderLocation;
  providerLevel?: ProviderLevel;
  providerWorkWeekday?: ProviderWorkWeekday;
  providerWeekday?: ProviderWeekday[];
  providerRateType?: ProviderRateType;
  providerWorkDayLimit?: number;
  providerStartTime?: string;
  providerEndTime?: string;
  providerAddress?: string;
  providerTitle?: string;
  providerWorkPrice?: number;
  providerImages?: string[];
  providerDesc?: string;

  deletedAt?: Date;
}
