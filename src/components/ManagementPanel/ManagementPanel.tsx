import React, { ChangeEvent, useEffect, useState } from 'react';
import { IDeal } from '../../domain/entities/Deal/model';
import { useSelector } from 'react-redux';
import { AppThunk, RootState, useAppDispatch } from '../../domain/redux/store';
import { thunkAccomplishDeal } from '../../domain/redux/services/accomplishDeal';
import { thunkCreateDeal } from '../../domain/redux/services/createDeal';

const Actions = {
    Accomplish: 'Accomplish deal',
    Create: 'Create new deal',
};
const DefaultAction = Actions.Accomplish;

export const ManagementPanel = () => {
    const dispatch = useAppDispatch();
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [action, setAction] = useState(DefaultAction);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);
    const [dealsCount, setDealsCount] = useState(0);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleActionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setAction(e.target.value);
    };

    const handleDealSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setDeal(deals.find(({ name }) => name === e.target.value));
    };

    const handleAction = () => {
        if (!deal) return alert('You should choose deal');

        let thunk;
        switch (action) {
            case Actions.Accomplish:
                thunk = thunkAccomplishDeal({
                    deal,
                    count: dealsCount,
                });
                break;

            case Actions.Create:
                // thunk = thunkCreateDeal({
                //     deal,
                // });
                break;
        }
        dispatch(thunk as AppThunk);
    };

    return (
        <div>
            <select onChange={handleActionSelect} defaultValue={action}>
                {Object.values(Actions).map((el, ind) => (
                    <option key={el + ind} value={el}>
                        {el}
                    </option>
                ))}
            </select>
            <select onChange={handleDealSelect} defaultValue={deal?.name}>
                {deals.map((deal, ind) => (
                    <option key={deal.name + ind} value={deal.name}>
                        {deal.name}
                    </option>
                ))}
            </select>
            <input
                type='number'
                value={dealsCount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDealsCount(Number(e.target.value))}
            />
            <button onClick={handleAction}>{action}</button>
        </div>
    );
};
