import { createSlice } from '@reduxjs/toolkit';
import { IStatSliceScheme } from './types';

const initialState: IStatSliceScheme = {};

const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
});

export const { actions: statActions } = statSlice;
export const { reducer: statReducer } = statSlice;
