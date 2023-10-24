import { IDeal } from '../../entities/Deal/model';
import { AppThunk } from '../store';

export interface IAccomplishDealParams {
    deal: IDeal;
    count?: number;
    date?: Date;
}

export const accomplishDeal = (params: IAccomplishDealParams): AppThunk => {
    const { deal, count = 1, date = new Date() } = params;
    return (dispatch) => {};
};
