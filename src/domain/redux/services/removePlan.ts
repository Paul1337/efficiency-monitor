import { IDeal } from '../../entities/Deal/model';
import { updatePlansDataInStorage } from '../data/plans';
import { plansActions } from '../slices/plans/plansSlice';
import { AppThunk } from '../store';

export const thunkRemoveDailyPlan = (deal: IDeal): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.removeDailyPlanByDeal(deal));
        updatePlansDataInStorage(getState().plans);
    };
};

export const thunkRemoveLongPlan = (deal: IDeal): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.removeLongPlanByDeal(deal));
        updatePlansDataInStorage(getState().plans);
    };
};
