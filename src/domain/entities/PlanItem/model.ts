import { IDeal } from '../Deal/model';

export interface IDailyPlan {
    name: string;
    deal: IDeal;
    count: number;
}

export interface IPlanItem extends IDailyPlan {
    date: Date;
}
