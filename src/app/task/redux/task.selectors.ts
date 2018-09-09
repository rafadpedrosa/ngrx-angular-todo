import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';
import * as fromTaskReducer from './task.reducer';

export const selectorTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTasks = createSelector(
  selectorTaskState,
  fromTaskReducer.selectAll
)

export const selectTaskById = (taskId: number) => createSelector(
  selectorTaskState,
  taskState => taskState.entities[ taskId ]
);

export const allTasks = createSelector(
  selectAllTasks,
  taskState => taskState
);
