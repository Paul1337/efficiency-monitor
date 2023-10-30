import { ChangeEvent, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { IDeal } from '../../../domain/entities/Deal/model';
import { DealSelector } from '../DealSelector/DealSelector';
import { EPlanType } from '../../../domain/entities/PlanItem/model';
import { thunkPlanDailyDeal, thunkPlanLongDeal } from '../../../domain/redux/services/planItem';
import { Button, Input } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { weekdays } from './lib/weekdays';

const Defaults = {
    PlanCount: 1,
};

const PlanTypeTexts: Record<EPlanType, string> = {
    [EPlanType.Daily]: 'Daily',
    [EPlanType.Long]: 'Long',
};

const DefaultPlanType = EPlanType.Long;

const WeekdaysSelectOptions = weekdays.map((day) => ({ label: day, value: day }));
const PlanTypeSelectOptions = Object.values(EPlanType)
    .filter((val) => !isNaN(Number(val)))
    .map((value) => ({
        value: value as EPlanType,
        label: PlanTypeTexts[value as EPlanType],
    }));

export const FormPlanItem = () => {
    const dispatch = useAppDispatch();
    const [planDate, setDate] = useState<Date>(new Date());
    const [planCount, setPlanCount] = useState(Defaults.PlanCount);
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [planType, setPlanType] = useState<EPlanType>(DefaultPlanType);
    const [weekends, setWeekends] = useState<Array<number>>([]);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (deal: IDeal) => setDeal(deal);
    // const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
    const handlePlanCountChange = (e: ChangeEvent<HTMLInputElement>) =>
        setPlanCount(Number(e.target.value));

    const handleAction = () => {
        if (!deal) return;

        switch (planType) {
            case EPlanType.Daily:
                dispatch(thunkPlanDailyDeal({ deal, count: planCount }));
                break;

            case EPlanType.Long:
                dispatch(
                    thunkPlanLongDeal({
                        deal,
                        count: planCount,
                        date: planDate.toString(),
                        startDate: new Date().toString(),
                    })
                );
                break;
        }
    };

    const handlePlanTypeChange = (e: any) => setPlanType(e.value);

    return (
        <div>
            <Select
                onChange={handlePlanTypeChange}
                defaultValue={{ value: planType, label: PlanTypeTexts[planType] }}
                options={PlanTypeSelectOptions}
            />
            {planType === EPlanType.Daily && (
                <>
                    Выходные
                    <Select
                        isMulti={true}
                        onChange={(weekends) =>
                            setWeekends(weekends.map((w) => weekdays.indexOf(w.value)))
                        }
                        // defaultValue={[]}
                        options={WeekdaysSelectOptions}
                    />
                </>
            )}

            {planType == EPlanType.Long && (
                <SingleDatepicker date={planDate} onDateChange={(newDate) => setDate(newDate)} />
            )}
            {deal && <DealSelector onSelect={handleDealSelect} value={deal} />}
            <Input
                marginY={2}
                type='number'
                value={planCount.toString()}
                onChange={handlePlanCountChange}
            />
            <Button marginY={2} onClick={handleAction}>
                Plan item
            </Button>
        </div>
    );
};
