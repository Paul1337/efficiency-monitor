import { ChangeEvent, useEffect, useState } from 'react';
import { IDeal } from '../../../domain/entities/Deal/model';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { thunkAccomplishDeal } from '../../../domain/redux/services/accomplishDeal';
import { DealSelector } from '../DealSelector/DealSelector';
import { thunkRemoveDeal } from '../../../domain/redux/services/removeDeal';

export const FormRemoveDeal = () => {
    const dispatch = useAppDispatch();
    const deals = useSelector((state: RootState) => state.deals.deals);
    const [deal, setDeal] = useState<IDeal | undefined>(deals[0]);

    useEffect(() => {
        setDeal(deals[0]);
    }, [deals]);

    const handleDealSelect = (deal: IDeal) => setDeal(deal);

    const handleAction = () => {
        if (!deal) return;
        dispatch(thunkRemoveDeal(deal));
    };

    return (
        <div>
            {deal && <DealSelector onSelect={handleDealSelect} value={deal} />}
            <button onClick={handleAction}>Remove deal</button>
        </div>
    );
};
