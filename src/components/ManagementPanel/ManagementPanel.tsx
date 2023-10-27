import { ChangeEvent, FC, FunctionComponent, ReactComponentElement, useState } from 'react';
import { FormAccomplishDeal } from './FormAccomplishDeal/FormAccomplishDeal';
import { FormCreateDeal } from './FormCreateDeal/FormCreateDeal';
import { FormPlanItem } from './FormPlanItem/FormPlanItem';

enum EActions {
    Accomplish = 'Accomplish deal',
    Create = 'Create new deal',
    PlanItem = 'Plan new item',
}

const DefaultAction = EActions.Accomplish;

const ActionToFormMap: Record<EActions, FunctionComponent> = {
    [EActions.Accomplish]: FormAccomplishDeal,
    [EActions.Create]: FormCreateDeal,
    [EActions.PlanItem]: FormPlanItem,
};

export const ManagementPanel = () => {
    const [action, setAction] = useState<EActions>(DefaultAction);

    const handleActionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setAction(e.target.value as EActions);
    };

    const Form = ActionToFormMap[action];

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
            {<Form />}
        </div>
    );
};
