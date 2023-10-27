import { ChangeEvent, useEffect, useState } from 'react';
import { IDeal } from '../../../domain/entities/Deal/model';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { thunkAccomplishDeal } from '../../../domain/redux/services/accomplishDeal';
import { DealSelector } from '../DealSelector/DealSelector';

export const FormAccomplishDeal = () => {
    const dispatch = useAppDispatch();
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [dealsCount, setDealsCount] = useState(0);

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
            <input type='number' value={dealsCount.toString()} onChange={handleDealsCounterChange} />
            <button onClick={handleAction}>Accomplish deal</button>
        </div>
    );
};
