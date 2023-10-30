import { ChangeEvent, useState } from 'react';
import { thunkCreateDeal } from '../../../domain/redux/services/createDeal';
import { RootState, useAppDispatch } from '../../../domain/redux/store';
import { useSelector } from 'react-redux';
import { Button, Input } from '@chakra-ui/react';

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
            <Input type='text' value={dealName} onChange={handleDealNameChange} />
            <Button onClick={handleAction}>Create deal</Button>
            {addError && <span>{addError}</span>}
        </div>
    );
};
