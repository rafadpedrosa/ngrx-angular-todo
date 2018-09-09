import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../model/task.model';
import { TaskActions, TaskActionTypes } from './task.actions';

export interface TaskState extends EntityState<Task> {
  allTasksLoaded: boolean;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTaskState: TaskState = adapter.getInitialState({
  allTasksLoaded: false
});

export function taskReducer(state = initialTaskState, action: TaskActions): TaskState {
  switch (action.type) {
    case TaskActionTypes.LoadedAllTasks:
      return adapter.addAll(action.payload, { ...state, allTasksLoaded: true });
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
