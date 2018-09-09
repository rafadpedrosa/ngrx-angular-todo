import { Action } from '@ngrx/store';
import { Task } from '../../model/task.model';

export enum TaskActionTypes {
  RequestAllTasks = '[Task] Request All Tasks',
  LoadedAllTasks = '[Task] Loaded All Tasks',
  DeleteTask = '[Task] Deleted task',
}

export class RequestAllTasks implements Action {
  readonly type = TaskActionTypes.RequestAllTasks;

  constructor(public payload: { userId: number }) {
  }
}

export class LoadedAllTasks implements Action {
  readonly type = TaskActionTypes.LoadedAllTasks;

  constructor(public payload: Task[]) {
  }
}

export class DeleteTask implements Action {
  readonly type = TaskActionTypes.DeleteTask;

  constructor(public payload: Task) {
  }
}

export type TaskActions = LoadedAllTasks | DeleteTask | RequestAllTasks;
