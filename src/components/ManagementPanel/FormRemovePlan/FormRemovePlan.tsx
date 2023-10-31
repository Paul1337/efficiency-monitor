import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../domain/entities/Deal/model';
import { DealSelector } from '../DealSelector/DealSelector';
import { EPlanType } from '../../../domain/entities/PlanItem/model';
import { thunkRemoveDailyPlan, thunkRemoveLongPlan } from '../../../domain/redux/services/removePlan';
import { Button } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

const PlanTypeTexts: Record<EPlanType, string> = {
    [EPlanType.Daily]: 'Daily',
    [EPlanType.Long]: 'Long',
};

const PlanTypeSelectOptions = Object.values(EPlanType)
    .filter((v) => !isNaN(Number(v)))
    .map((value) => ({
        label: PlanTypeTexts[value as EPlanType],
        value,
    }));

const PlanTypeDefaultOption = PlanTypeSelectOptions.find((opt) => opt.value === EPlanType.Daily);

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

    const handlePlanTypeChange = (e: any) => setPlanType(e.value);

    return (
        <div>
            <Select
                onChange={handlePlanTypeChange}
                defaultValue={PlanTypeDefaultOption}
                options={PlanTypeSelectOptions}
            />

            {deal && <DealSelector onSelect={handleDealSelect} value={deal} />}
            <Button onClick={handleAction}>Remove item</Button>
        </div>
    );
};
