import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IDailyPlan, IPlanItem } from '../../entities/PlanItem/model';
import { plansActions } from '../slices/plans/plansSlice';
import { IPlansSliceScheme } from '../slices/plans/types';
import { AppThunk } from '../store';

const updatePlansDataInStorage = (plans: IPlansSliceScheme) => {
    localStorage.setItem(localStorageConfig.PlansKey, JSON.stringify(plans));
};

export const thunkPlanLongDeal = (plan: IPlanItem): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.addLongPlan(plan));
        updatePlansDataInStorage(getState().plans);
    };
};

export const thunkPlanDailyDeal = (plan: IDailyPlan): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.addDailyPlan(plan));
        updatePlansDataInStorage(getState().plans);
    };
};
