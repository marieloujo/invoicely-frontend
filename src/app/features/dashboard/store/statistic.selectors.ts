import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatisticState } from './statistic.reducer';

export const selectStatisticState = createFeatureSelector<StatisticState>('statistics');

export const selectAllStatistics = createSelector(
  selectStatisticState,
  (state: StatisticState) => state.statistic
);

export const selectStatisticError = createSelector(
  selectStatisticState,
  (state: StatisticState) => state.error
);

export const selectLoading = createSelector(
  selectStatisticState,
  (state: StatisticState) => state.loading
);