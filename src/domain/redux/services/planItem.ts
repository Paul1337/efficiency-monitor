import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IPlanItem } from '../../entities/PlanItem/model';
import { plansActions } from '../slices/plans/plansSlice';
import { AppThunk } from '../store';

export const thunkPlanItem = (planItem: IPlanItem): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.addPlan(planItem));
        const plans = getState().plans.items.map((item) => ({ ...item, date: item.date.toString() }));
        localStorage.setItem(localStorageConfig.PlansKey, JSON.stringify(plans));
    };
};
