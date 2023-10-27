import { ChangeEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/redux/store';
import { IDeal } from '../../../domain/entities/Deal/model';

interface IDealSelectorProps {
    onSelect: (deal: IDeal) => void;
    value: IDeal;
}

export const DealSelector: FC<IDealSelectorProps> = (props) => {
    const { onSelect, value } = props;

    const deals = useSelector((state: RootState) => state.deals.deals);

    const handleDealSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedDeal = deals.find(({ name }) => name === e.target.value) as IDeal;
        onSelect(newSelectedDeal);
    };

    return (
        <div>
            <select onChange={handleDealSelect} defaultValue={value.name}>
                {deals.map((deal, ind) => (
                    <option key={deal.name + ind} value={deal.name}>
                        {deal.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
