import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPlansSliceScheme } from './types';
import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';

const initialState: IPlansSliceScheme = {
    longPlans: [],
    dailyPlans: [],
};

export interface ISetDataPayload {
    longPlans: IPlansSliceScheme['longPlans'];
    dailyPlans: IPlansSliceScheme['dailyPlans'];
}

const plansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        setData(state: IPlansSliceScheme, action: PayloadAction<ISetDataPayload>) {
            state.longPlans = action.payload.longPlans ?? [];
            state.dailyPlans = action.payload.dailyPlans ?? [];
        },
        addLongPlan(state: IPlansSliceScheme, action: PayloadAction<IPlanItem>) {
            state.longPlans.push(action.payload);
        },
        addDailyPlan(state: IPlansSliceScheme, action: PayloadAction<IDailyPlan>) {
            state.dailyPlans.push(action.payload);
        },
    },
});

export const { actions: plansActions } = plansSlice;
export const { reducer: plansReducer } = plansSlice;
