import { ChangeEvent, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { thunkPlanItem } from '../../../domain/redux/services/planItem';
import { IDeal } from '../../../domain/entities/Deal/model';

const Defaults = {
    PlanCount: 0,
};

export const FormPlanItem = () => {
    const dispatch = useAppDispatch();
    const [planDate, setDate] = useState('');
    const [planName, setPlanName] = useState('');
    const [planCount, setPlanCount] = useState(Defaults.PlanCount);
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setDeal(deals.find(({ name }) => name === e.target.value));
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        setDate(e.target.value);
    };

    const handlePlanCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlanCount(Number(e.target.value));
    };

    const handlePlanNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlanName(e.target.value);
    };

    const handleAction = () => {
        if (!deal) return;
        const thunkPlan = thunkPlanItem({
            date: planDate,
            count: planCount,
            deal,
            name: planName,
        });
        dispatch(thunkPlan);
    };

    return (
        <div>
            <input type='text' value={planName} onChange={handlePlanNameChange} />
            <input type='date' value={planDate} onChange={handleDateChange} />
            <select onChange={handleDealSelect} defaultValue={deal?.name}>
                {deals.map((deal, ind) => (
                    <option key={deal.name + ind} value={deal.name}>
                        {deal.name}
                    </option>
                ))}
            </select>
            <input type='number' value={planCount.toString()} onChange={handlePlanCountChange} />
            <button onClick={handleAction}>Plan item</button>
        </div>
    );
};
