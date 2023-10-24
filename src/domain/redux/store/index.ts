import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { statReducer } from '../slices/stat/statSlice';
import { dealsReducer } from '../slices/deals/dealsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: combineReducers({
        stat: statReducer,
        deals: dealsReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
