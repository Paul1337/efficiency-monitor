import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { sameDay } from '../../../domain/shared/compareDates';

export const DailyDashboard = () => {
    const history = useSelector((state: RootState) => state.history.items);
    const todayDate = new Date();
    const todayHistoryItem = history.find((item) => sameDay(todayDate, item.date));
    const plans = useSelector((state: RootState) => state.plans.items);

    return (
        <div>
            <h1>Daily dashboard</h1>
            {todayHistoryItem && (
                <div>
                    {Object.keys(todayHistoryItem.done).map((item) => (
                        <div key={item}>
                            {item}: {todayHistoryItem.done[item]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
