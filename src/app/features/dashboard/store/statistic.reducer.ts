import { createReducer, on } from '@ngrx/store';
import * as StatisticActions from './statistic.actions';
import { Statistic } from '@app/shared/models/statistic.model';

export interface StatisticState {
  statistic: Statistic | null;
  error: any;
  loading: boolean;
}

export const initialState: StatisticState = {
  statistic: null,
  loading: false,
  error: null
};

export const statisticReducer = createReducer(
  initialState,
  on(StatisticActions.loadStatisticsSuccess, (state, { statistic }) => ({
    ...state,
    statistic
  })),
  on(StatisticActions.loadStatisticsFailure, (state, { error }) => ({ ...state, error }))
);