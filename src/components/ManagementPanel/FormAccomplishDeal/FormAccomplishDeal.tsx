import { ChangeEvent, useEffect, useState } from 'react';
import { IDeal } from '../../../domain/entities/Deal/model';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { thunkAccomplishDeal } from '../../../domain/redux/services/accomplishDeal';

export const FormAccomplishDeal = () => {
    const dispatch = useAppDispatch();
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [dealsCount, setDealsCount] = useState(0);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setDeal(deals.find(({ name }) => name === e.target.value));
    };

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
            <select onChange={handleDealSelect} defaultValue={deal?.name}>
                {deals.map((deal, ind) => (
                    <option key={deal.name + ind} value={deal.name}>
                        {deal.name}
                    </option>
                ))}
            </select>
            <input type='number' value={dealsCount.toString()} onChange={handleDealsCounterChange} />
            <button onClick={handleAction}>Accomplish deal</button>
        </div>
    );
};
