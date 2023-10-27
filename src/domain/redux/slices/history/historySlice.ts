import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IHistorySliceScheme } from './types';
import { IHistoryItem } from '../../../entities/HistoryItem/model';
import { IDeal } from '../../../entities/Deal/model';
import { sameDay } from '../../../shared/compareDates';

const initialState: IHistorySliceScheme = {
    items: [],
};

export interface IAccomplishDealPayload {
    date: string;
    count: number;
    deal: IDeal;
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state: IHistorySliceScheme, action: PayloadAction<IHistoryItem[]>) {
            state.items = action.payload;
        },
        accomplishDeal(state: IHistorySliceScheme, action: PayloadAction<IAccomplishDealPayload>) {
            const { deal, date, count } = action.payload;
            const historyItem = state.items.find((item) => sameDay(item.date, date));
            if (historyItem) {
                if (!historyItem.done[deal.name]) historyItem.done[deal.name] = 0;
                historyItem.done[deal.name] += count;
            } else {
                const newHistoryItem: IHistoryItem = {
                    date,
                    done: {
                        [deal.name]: count,
                    },
                };
                state.items.push(newHistoryItem);
            }
        },
    },
});

export const { actions: historyActions } = historySlice;
export const { reducer: historyReducer } = historySlice;
