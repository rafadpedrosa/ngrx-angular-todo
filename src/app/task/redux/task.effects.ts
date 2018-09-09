import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, map, mapTo, mergeMap, withLatestFrom } from 'rxjs/operators';
import { selectAuthState } from '../../auth/redux/auth.selectors';
import { TaskService } from '../service/task.service';
import { LoadedAllTasks, RequestAllTasks, TaskActionTypes } from './task.actions';
import { TaskState } from './task.reducer';
import { selectorTaskState } from './task.selectors';

@Injectable()
export class TaskEffects {

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<RequestAllTasks>(TaskActionTypes.RequestAllTasks),
    withLatestFrom(this.store.pipe(select(selectorTaskState))),
    filter(([ action, tasks ]) => !tasks.ids.length),
    mapTo(this.store.pipe(select(selectAuthState))),
    mergeMap(authState => this.taskService.fetchTasks()), // put the user id
    map(tasks => this.store.dispatch(new LoadedAllTasks(tasks.data)))
  );

  constructor(
    private actions$: Actions, private store: Store<TaskState>, private taskService: TaskService
  ) {
  }
}
