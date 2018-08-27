import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTasksState = createFeatureSelector<TaskState>('tasks');

export const selectTaskById = (taskId: number) => createSelector(
  selectTasksState,
  taskState => taskState.entities[ taskId ]
);
