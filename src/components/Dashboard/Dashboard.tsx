import { DailyDashboard } from './DailyDashboard/DailyDashboard';
import { TotalDashboard } from './TotalDashboard/TotalDashboard';

export const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <DailyDashboard />
            <TotalDashboard />
        </div>
    );
};
