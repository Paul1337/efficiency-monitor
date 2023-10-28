import { DailyDashboard } from './DailyDashboard/DailyDashboard';
import { TotalDashboard } from './TotalDashboard/TotalDashboard';
import cls from './Dashboard.module.css';

export const Dashboard = () => {
    return (
        <div className={cls.Dashboard}>
            <h1>Dashboard</h1>
            <hr />
            <div className={cls.dashboardsCont}>
                <DailyDashboard />
                <TotalDashboard />
            </div>
        </div>
    );
};
