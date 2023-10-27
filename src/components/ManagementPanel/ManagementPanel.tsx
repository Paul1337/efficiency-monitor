import { ChangeEvent, FC, useState } from 'react';
import { FormAccomplishDeal } from './FormAccomplishDeal/FormAccomplishDeal';
import { FormCreateDeal } from './FormCreateDeal/FormCreateDeal';
import { FormPlanItem } from './FormPlanItem/FormPlanItem';

enum EActions {
    Accomplish = 'Accomplish deal',
    Create = 'Create new deal',
    PlanItem = 'Plan new item',
}

const DefaultAction = EActions.Accomplish;

interface IFormProps {
    action: EActions;
}

const Form: FC<IFormProps> = (props) => {
    const { action } = props;
    if (action === EActions.Accomplish) return <FormAccomplishDeal />;
    if (action === EActions.Create) return <FormCreateDeal />;
    if (action === EActions.PlanItem) return <FormPlanItem />;
    return <></>;
};

export const ManagementPanel = () => {
    const [action, setAction] = useState<EActions>(DefaultAction);

    const handleActionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setAction(e.target.value as EActions);
    };

    return (
        <div>
            <div>
                <span>Select action </span>
                <select onChange={handleActionSelect} defaultValue={action}>
                    {Object.values(EActions).map((el, ind) => (
                        <option key={el + ind} value={el}>
                            {el}
                        </option>
                    ))}
                </select>
            </div>
            <Form action={action} />
        </div>
    );
};
