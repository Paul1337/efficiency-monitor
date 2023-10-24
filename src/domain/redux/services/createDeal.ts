import { IDeal } from '../../entities/Deal/model';
import { dealsActions } from '../slices/deals/dealsSlice';
import { AppThunk } from '../store';

export interface IAddDealParams {
    deal: IDeal;
}

export const createDeal = (params: IAddDealParams): AppThunk => {
    const { deal } = params;
    return (dispatch, getState) => {
        const deals = getState().deals.deals;
        deals.push(deal);

        localStorage.setItem('deals', JSON.stringify(deals));
        dispatch(dealsActions.setDeals(deals));
    };
};
