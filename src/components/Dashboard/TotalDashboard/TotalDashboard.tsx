import React from 'react';
import cls from '../Dashboard.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { compareDays } from '../../../domain/shared/compareDates';
import classNames from 'classnames';
import { IPlanItem } from '../../../domain/entities/PlanItem/model';

export const TotalDashboard = () => {
    const history = useSelector((state: RootState) => state.history.items);
    const longPlans = useSelector((state: RootState) => state.plans.longPlans);

    const currentDate = new Date();
    const plansInFuture = longPlans.filter((plan) => compareDays(plan.date, currentDate) >= 0);
    const pastPlans = longPlans.filter((plan) => compareDays(plan.date, currentDate) < 0);

    const calculatePlanDoneCount = (plan: IPlanItem): number => {
        return history.reduce((prev, cur) => {
            if (cur.done[plan.deal.name] && compareDays(cur.date, plan.startDate)) {
                return prev + cur.done[plan.deal.name];
            }
            return prev;
        }, 0);
    };

    return (
        <div className={cls.ConcreteDashboard}>
            <h1 className={cls.heading}>Total dashboard</h1>
            {
                <div className={cls.listView}>
                    {plansInFuture.map((plan, ind) => {
                        const done = calculatePlanDoneCount(plan);
                        return (
                            <div className={cls.item} key={plan.deal.name + ind}>
                                <span>
                                    {plan.deal.name} ({plan.date}):
                                </span>
                                <span>
                                    <span
                                        className={classNames(
                                            cls.itemValue,
                                            done >= plan.count && cls.done
                                        )}
                                    >
                                        {done}
                                    </span>
                                    /
                                    <span className={cls.itemPlannedValue}>
                                        {plan.count}{' '}
                                        <span className={cls.itemPlannedValuePercent}>
                                            ({((done / plan.count) * 100).toFixed(0)}%)
                                        </span>
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};
