import { createSlice } from '@reduxjs/toolkit';
import { IDashboardSliceScheme } from './types';

const initialState: IDashboardSliceScheme = {};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
});

export const { actions: dashboardActions } = dashboardSlice;
export const { reducer: dashboardReducer } = dashboardSlice;
