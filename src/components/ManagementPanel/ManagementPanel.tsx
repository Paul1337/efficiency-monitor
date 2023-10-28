import { ChangeEvent, FC, FunctionComponent, ReactComponentElement, useState } from 'react';
import { FormAccomplishDeal } from './FormAccomplishDeal/FormAccomplishDeal';
import { FormCreateDeal } from './FormCreateDeal/FormCreateDeal';
import { FormPlanItem } from './FormPlanItem/FormPlanItem';
import cls from './ManagementPanel.module.css';
import { FormRemoveDeal } from './FormRemoveDeal/FormRemoveDeal';
import { FormRemovePlan } from './FormRemovePlan/FormRemovePlan';

enum EActions {
    Accomplish = 'Accomplish deal',
    Create = 'Create new deal',
    RemoveDeal = 'Remove deal',
    PlanItem = 'Plan deal',
    RemovePlan = 'Remove Plan',
}

const DefaultAction = EActions.Accomplish;

const ActionToFormMap: Record<EActions, FunctionComponent> = {
    [EActions.Accomplish]: FormAccomplishDeal,
    [EActions.Create]: FormCreateDeal,
    [EActions.PlanItem]: FormPlanItem,
    [EActions.RemoveDeal]: FormRemoveDeal,
    [EActions.RemovePlan]: FormRemovePlan,
};

export const ManagementPanel = () => {
    const [action, setAction] = useState<EActions>(DefaultAction);

    const handleActionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setAction(e.target.value as EActions);
    };

    const Form = ActionToFormMap[action];

    return (
        <div className={cls.ManagementPanel}>
            <h1>Management</h1>
            <div className={cls.actionSelectorCont}>
                <span className={cls.selectAction}>Select action</span>
                <select
                    className={cls.actionSelector}
                    onChange={handleActionSelect}
                    defaultValue={action}
                >
                    {Object.values(EActions).map((el, ind) => (
                        <option key={el + ind} value={el}>
                            {el}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.ManagementFormCont}>{<Form />}</div>
        </div>
    );
};
