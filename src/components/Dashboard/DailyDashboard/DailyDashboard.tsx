import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';

export const DailyDashboard = () => {
    const history = useSelector((state: RootState) => state.history.items);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const todayHistoryItem = history.find((item) => {
        item.date.setHours(0, 0, 0, 0);
        return todayDate.getTime() === item.date.getTime();
    });
    const plans = useSelector((state: RootState) => state.plans.items);

    console.log('history:', history);
    console.log('plans:', plans);

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
