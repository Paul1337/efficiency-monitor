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
import { Weekdays } from './lib/weekdays';

const Defaults = {
    PlanCount: 1,
};

const PlanTypeTexts: Record<EPlanType, string> = {
    [EPlanType.Daily]: 'Daily',
    [EPlanType.Long]: 'Long',
};

const DefaultPlanType = EPlanType.Long;

const WeekdaysSelectOptions = Weekdays.map((day) => ({ label: day, value: day }));
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
    const [weekdays, setWeekdays] = useState<Array<number>>([0, 1, 2, 3, 4, 5, 6]);

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
                dispatch(thunkPlanDailyDeal({ deal, count: planCount, weekdays }));
                break;

            case EPlanType.Long:
                dispatch(
                    thunkPlanLongDeal({
                        deal,
                        count: planCount,
                        date: stringifyDate(planDate),
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
                    Дни недели
                    <Select
                        defaultValue={WeekdaysSelectOptions}
                        isMulti={true}
                        onChange={(selectedWeekdays) =>
                            setWeekdays(selectedWeekdays.map((w) => Weekdays.indexOf(w.value)))
                        }
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
