import { Action } from '@ngrx/store';
import { Task } from '../../model/task.model';

export enum TaskActionTypes {
  RequestedTasks = '[Task] Requested Tasks',
  LoadTasks = '[Task] Loaded Tasks',
  DeleteTasks = '[Task] Loaded Tasks',
}

export class RequestedTasks implements Action {
  readonly type = TaskActionTypes.RequestedTasks;

  constructor(public payload: { userId: number }) {
  }
}

export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LoadTasks;

  constructor(public payload: Task[]) {
  }
}

export class DeleteTasks implements Action {
  readonly type = TaskActionTypes.DeleteTasks;

  constructor(public payload: Task) {
  }
}

export type TaskActions = LoadTasks | DeleteTasks | RequestedTasks;
