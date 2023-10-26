import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IDeal } from '../../entities/Deal/model';
import { historyActions } from '../slices/history/historySlice';
import { AppThunk } from '../store';

export interface IAccomplishDealParams {
    deal: IDeal;
    count?: number;
    date?: Date;
}

export const thunkAccomplishDeal = (params: IAccomplishDealParams): AppThunk => {
    const { deal, count = 1, date = new Date() } = params;
    date.setHours(0, 0, 0, 0);

    return (dispatch, getState) => {
        const history = getState().history.items;

        const newHistory = history.map((item) => {
            const itemDate = { ...item.date };
            itemDate.setHours(0, 0, 0, 0);
            if (itemDate.getTime() === date.getTime()) item.done[deal.name] += count;
            return item;
        });

        localStorage.setItem(localStorageConfig.HistoryKey, JSON.stringify(newHistory));

        dispatch(historyActions.setHistory(newHistory));
    };
};
