import { IDeal } from '../Deal/model';

export enum EPlanType {
    Daily,
    Long,
}

export interface IDailyPlan {
    deal: IDeal;
    count: number;
}

export interface IPlanItem extends IDailyPlan {
    date: string;
}
