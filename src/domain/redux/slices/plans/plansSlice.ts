import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPlansSliceScheme } from './types';
import { IPlanItem } from '../../../entities/PlanItem/model';

const initialState: IPlansSliceScheme = {
    items: [],
};

const plansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        setPlans(state: IPlansSliceScheme, action: PayloadAction<IPlanItem[]>) {
            state.items = action.payload;
        },
        addPlan(state: IPlansSliceScheme, action: PayloadAction<IPlanItem>) {
            state.items.push(action.payload);
        },
    },
});

export const { actions: plansActions } = plansSlice;
export const { reducer: plansReducer } = plansSlice;
