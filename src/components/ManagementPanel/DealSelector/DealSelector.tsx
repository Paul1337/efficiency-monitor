import { ChangeEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDeal } from '../../../domain/entities/Deal/model';
import { Select } from 'chakra-react-select';

interface IDealSelectorProps {
    onSelect: (deal: IDeal) => void;
    value: IDeal;
}

export const DealSelector: FC<IDealSelectorProps> = (props) => {
    const { onSelect, value } = props;

    const deals = useSelector((state: RootState) => state.deals.deals);

    const handleDealSelect = (e: any) => {
        const value = e.value;
        const newSelectedDeal = deals.find(({ name }) => name === value) as IDeal;
        onSelect(newSelectedDeal);
    };

    return (
        <div>
            <Select
                onChange={handleDealSelect}
                defaultValue={{ label: value.name, value: value.name }}
                options={deals.map((deal) => ({ label: deal.name, value: deal.name }))}
            />
        </div>
    );
};
