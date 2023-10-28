import React from 'react';
import cls from '../Dashboard.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';

export const TotalDashboard = () => {
    const history = useSelector((state: RootState) => state.history.items);
    const longPlans = useSelector((state: RootState) => state.plans.longPlans);

    return (
        <div className={cls.ConcreteDashboard}>
            <h1>Total dashboard</h1>
            {/* {todayHistoryItem && (
                <div className={cls.listView}>
                    {Object.keys(todayHistoryItem.done).map((item) => (
                        <div className={cls.item} key={item}>
                            {item}: <span className={cls.itemValue}>{todayHistoryItem.done[item]}</span>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};
