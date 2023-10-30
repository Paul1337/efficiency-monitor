import { ChangeEvent, FC, FunctionComponent, ReactComponentElement, useState } from 'react';
import { FormAccomplishDeal } from './FormAccomplishDeal/FormAccomplishDeal';
import { FormCreateDeal } from './FormCreateDeal/FormCreateDeal';
import { FormPlanItem } from './FormPlanItem/FormPlanItem';
import cls from './ManagementPanel.module.css';
import { FormRemoveDeal } from './FormRemoveDeal/FormRemoveDeal';
import { FormRemovePlan } from './FormRemovePlan/FormRemovePlan';
import { Card, Heading } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

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

    const handleActionSelect = (value: any) => setAction(value.value);

    const Form = ActionToFormMap[action];

    return (
        <Card>
            <Heading>Management</Heading>
            <div className={cls.actionSelectorCont}>
                <span className={cls.selectAction}>Select action</span>
                <Select
                    className={cls.actionSelector}
                    onChange={handleActionSelect}
                    defaultValue={{ value: EActions.Accomplish, label: EActions.Accomplish }}
                    options={Object.values(EActions).map((el) => ({ label: el, value: el }))}
                />
            </div>
            <div className={cls.ManagementFormCont}>{<Form />}</div>
        </Card>
    );
};
