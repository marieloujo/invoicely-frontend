import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as StatisticActions from './statistic.actions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { DashboardService } from '../services/dashboard.service';
import { ErrorHandlerService } from '@app/core/services/exceptions.service';

@Injectable()
export class StatisticEffects {

  loadStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticActions.loadStatistics),
      mergeMap(action =>
        this.statisticService.getStatistic().pipe(
          map(response => StatisticActions.loadStatisticsSuccess({
            statistic: response.data
          })),
          catchError(error => of(StatisticActions.loadStatisticsFailure({ error }))),
        )
      ),
    )
  );

  loadStatisticsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticActions.loadStatisticsFailure),
      map(action => {
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  constructor(
    private toastr: ToastrService,
    private actions$: Actions,
    private store: Store,
    private statisticService: DashboardService,
    private errorHandlerService: ErrorHandlerService
  ) {}
}
