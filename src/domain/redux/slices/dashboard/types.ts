import { IDeal } from '../../../entities/Deal/model';
import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';

export interface IDailyProgress extends IDailyPlan {
    done: number;
    percentage: number;
}

export interface IDailyInfo {
    dealsStat: Record<IDeal['name'], number>;
    progresses: IDailyProgress[];
}

export interface IPlanProgress extends IPlanItem {
    done: number;
    percentage: number;
}

export interface ITotalInfo {
    dealsStat: Record<IDeal['name'], number>;
    progresses: IPlanProgress[];
}

export interface IDashboardSliceScheme {
    dailyInfo?: IDailyInfo;
    totalInfo?: ITotalInfo;
}
