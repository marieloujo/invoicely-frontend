import { Statistic } from '@app/shared/models/statistic.model';
import { createAction, props } from '@ngrx/store';

export const loadStatistics = createAction('[Statistic List] Load Statistics', props<{ page: number }>());
export const loadStatisticsSuccess = createAction('[Statistic List] Load Statistics Success', props<{ statistic: Statistic }>());
export const loadStatisticsFailure = createAction('[Statistic List] Load Statistics Failure', props<{ error: any }>());
