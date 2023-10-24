import { IDeal } from '../Deal/model';

export interface IPlanItem {
    name: string;
    date: Date;
    plans: Record<IDeal['name'], number>;
}

export interface IDailyPlan {
    name: string;
    deal: IDeal;
    count: number;
}
