import { ChangeEvent, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../domain/entities/Deal/model';
import { DealSelector } from '../DealSelector/DealSelector';
import { EPlanType } from '../../../domain/entities/PlanItem/model';
import { thunkPlanDailyDeal, thunkPlanLongDeal } from '../../../domain/redux/services/planItem';
import { thunkRemoveDailyPlan, thunkRemoveLongPlan } from '../../../domain/redux/services/removePlan';
import { Button, Select } from '@chakra-ui/react';

const PlanTypeTexts: Record<EPlanType, string> = {
    [EPlanType.Daily]: 'Daily',
    [EPlanType.Long]: 'Long',
};

export const FormRemovePlan = () => {
    const dispatch = useAppDispatch();
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [planType, setPlanType] = useState<EPlanType>(EPlanType.Long);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (deal: IDeal) => setDeal(deal);

    const handleAction = () => {
        if (!deal) return;

        switch (planType) {
            case EPlanType.Daily:
                dispatch(thunkRemoveDailyPlan(deal));
                break;

            case EPlanType.Long:
                dispatch(thunkRemoveLongPlan(deal));
                break;
        }
    };

    const handlePlanTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setPlanType(Number(e.target.value) as EPlanType);

    return (
        <div>
            <Select onChange={handlePlanTypeChange} defaultValue={planType}>
                {Object.entries(PlanTypeTexts).map(([value, text]) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </Select>
            {deal && <DealSelector onSelect={handleDealSelect} value={deal} />}
            <Button onClick={handleAction}>Remove item</Button>
        </div>
    );
};
