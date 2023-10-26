import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPlansSliceScheme } from './types';
import { IPlanItem } from '../../../entities/PlanItem/model';

const initialState: IPlansSliceScheme = {
    items: [],
};

const statSlice = createSlice({
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

export const { actions: plansActions } = statSlice;
export const { reducer: plansReducer } = statSlice;
