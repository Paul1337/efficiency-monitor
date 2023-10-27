import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IDeal } from '../../entities/Deal/model';
import { dealsActions } from '../slices/deals/dealsSlice';
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
        dispatch(historyActions.accomplishDeal({ deal, count, date }));
        const history = getState().history.items;
        localStorage.setItem(localStorageConfig.HistoryKey, JSON.stringify(history));
    };
};
