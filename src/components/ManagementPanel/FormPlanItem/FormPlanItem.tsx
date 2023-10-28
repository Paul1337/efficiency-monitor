import { ChangeEvent, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../domain/entities/Deal/model';
import { DealSelector } from '../DealSelector/DealSelector';
import { EPlanType } from '../../../domain/entities/PlanItem/model';
import { thunkPlanDailyDeal, thunkPlanLongDeal } from '../../../domain/redux/services/planItem';

const Defaults = {
    PlanCount: 0,
};

const PlanTypeTexts: Record<EPlanType, string> = {
    [EPlanType.Daily]: 'Daily',
    [EPlanType.Long]: 'Long',
};

export const FormPlanItem = () => {
    const dispatch = useAppDispatch();
    const [planDate, setDate] = useState('');
    const [planCount, setPlanCount] = useState(Defaults.PlanCount);
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [planType, setPlanType] = useState<EPlanType>(EPlanType.Long);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (deal: IDeal) => setDeal(deal);
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
    const handlePlanCountChange = (e: ChangeEvent<HTMLInputElement>) =>
        setPlanCount(Number(e.target.value));

    const handleAction = () => {
        if (!deal) return;

        switch (planType) {
            case EPlanType.Daily:
                dispatch(thunkPlanDailyDeal({ deal, count: planCount }));
                break;

            case EPlanType.Long:
                dispatch(thunkPlanLongDeal({ deal, count: planCount, date: planDate }));
                break;
        }
    };

    const handlePlanTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setPlanType(Number(e.target.value) as EPlanType);

    return (
        <div>
            <select onChange={handlePlanTypeChange} defaultValue={planType}>
                {Object.entries(PlanTypeTexts).map(([value, text]) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
            {planType == EPlanType.Long && (
                <input type='date' value={planDate} onChange={handleDateChange} />
            )}
            {deal && <DealSelector onSelect={handleDealSelect} value={deal} />}
            <input type='number' value={planCount.toString()} onChange={handlePlanCountChange} />
            <button onClick={handleAction}>Plan item</button>
        </div>
    );
};
