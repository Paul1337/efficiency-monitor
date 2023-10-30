import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { sameDay } from '../../../domain/shared/compareDates';
import cls from '../Dashboard.module.css';
import classNames from 'classnames';
import { BaseDashboard } from '../BaseDashboard/BaseDashboard';

export const DailyDashboard = () => {
    const history = useSelector((state: RootState) => state.history.items);
    const todayDate = new Date();
    const todayHistoryItem = history.find((item) => sameDay(todayDate, item.date));

    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);
    let otherDone: string[] = [];
    if (todayHistoryItem) {
        otherDone = Object.keys(todayHistoryItem?.done).filter((doneKey) =>
            dailyPlans.every((dailyPlan) => dailyPlan.deal.name !== doneKey)
        );
    }
    const allPlans = dailyPlans.reduce((acc, cur) => acc + cur.count, 0);
    const plansDone = dailyPlans.reduce((acc, cur) => {
        const done = todayHistoryItem?.done[cur.deal.name] ?? 0;
        return acc + Math.min(done, cur.count);
    }, 0);
    const overallPlansPercent = allPlans === 0 ? 0 : (plansDone / allPlans) * 100;

    return (
        <BaseDashboard title='Daily dashboard'>
            <div className={cls.sectionHeading}>Today plans:</div>
            <div className={cls.listView}>
                {dailyPlans.map((dailyPlan, ind) => {
                    const done = todayHistoryItem?.done[dailyPlan.deal.name] ?? 0;
                    return (
                        <div className={cls.item} key={dailyPlan.deal.name + ind}>
                            <span className={cls.itemDescr}>{dailyPlan.deal.name}:</span>
                            <span className={cls.itemInfo}>
                                <span
                                    className={classNames(
                                        cls.itemValue,
                                        done >= dailyPlan.count && cls.done
                                    )}
                                >
                                    {done}
                                </span>
                                /
                                <span className={cls.itemPlannedValue}>
                                    {dailyPlan.count}{' '}
                                    <span className={cls.itemPlannedValuePercent}>
                                        ({((done / dailyPlan.count) * 100).toFixed(0)}%)
                                    </span>
                                </span>
                            </span>
                        </div>
                    );
                })}
                <div className={cls.sectionHeading}>Overall plan accomplishing:</div>
                <div className={cls.overAllPercent}>{overallPlansPercent.toFixed(2)}%</div>

                <div className={cls.sectionHeading}>Other deals:</div>
                {otherDone.length > 0 ? (
                    <div className={cls.listView}>
                        {otherDone.map((doneKey) => (
                            <div className={cls.item} key={doneKey}>
                                {doneKey}
                                <span className={cls.itemValue}>{todayHistoryItem?.done[doneKey]}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cls.item}>no deals</div>
                )}
            </div>
        </BaseDashboard>
    );
};
