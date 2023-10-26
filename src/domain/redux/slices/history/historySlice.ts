import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IHistorySliceScheme } from './types';
import { IHistoryItem } from '../../../entities/HistoryItem/model';

const initialState: IHistorySliceScheme = {
    items: [],
};

const statSlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state: IHistorySliceScheme, action: PayloadAction<IHistoryItem[]>) {
            state.items = action.payload;
        },
    },
});

export const { actions: historyActions } = statSlice;
export const { reducer: historyReducer } = statSlice;
