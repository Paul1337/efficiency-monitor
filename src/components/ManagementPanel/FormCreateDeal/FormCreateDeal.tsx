import { ChangeEvent, useState } from 'react';
import { thunkCreateDeal } from '../../../domain/redux/services/createDeal';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';

export const FormCreateDeal = () => {
    const dispatch = useAppDispatch();
    const addError = useSelector((state: RootState) => state.deals.addError);
    const [dealName, setDealName] = useState('');

    const handleDealNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDealName(e.target.value);
    };

    const handleAction = () => {
        dispatch(thunkCreateDeal(dealName));
    };

    return (
        <div>
            <input type='text' value={dealName} onChange={handleDealNameChange} />
            <button onClick={handleAction}>Create deal</button>
            {addError && <span>{addError}</span>}
        </div>
    );
};
