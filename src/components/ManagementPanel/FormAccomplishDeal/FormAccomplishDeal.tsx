import { ChangeEvent, useEffect, useState } from 'react';
import { IDeal } from '../../../domain/entities/Deal/model';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { thunkAccomplishDeal } from '../../../domain/redux/services/accomplishDeal';
import { DealSelector } from '../DealSelector/DealSelector';
import { Button, Input } from '@chakra-ui/react';

const Defaults = {
    DealsCount: 1,
};

export const FormAccomplishDeal = () => {
    const dispatch = useAppDispatch();
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [dealsCount, setDealsCount] = useState(Defaults.DealsCount);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (deal: IDeal) => setDeal(deal);

    const handleDealsCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = Number(e.target.value);
        if (count >= 0) setDealsCount(count);
    };

    const handleAction = () => {
        if (!deal) return;
        const thunk = thunkAccomplishDeal({
            deal,
            count: dealsCount,
        });
        dispatch(thunk);
    };

    return (
        <div>
            {deal && <DealSelector onSelect={handleDealSelect} value={deal} />}
            <Input
                marginTop={2}
                marginRight={2}
                width={'fit-content'}
                type='number'
                value={dealsCount.toString()}
                onChange={handleDealsCounterChange}
            />
            <Button marginY={2} onClick={handleAction}>
                Accomplish deal
            </Button>
        </div>
    );
};
