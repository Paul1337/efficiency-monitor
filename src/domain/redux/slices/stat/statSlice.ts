import { createSlice } from '@reduxjs/toolkit';
import { IStatSliceScheme } from './types';

const initialState: IStatSliceScheme = {
    plan: {},
    current: {},
};

const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
});

export const { actions: statActions } = statSlice;
export const { reducer: statReducer } = statSlice;
