import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Task } from '../../model/task.model';

export interface TaskState extends EntityState<Task> {

}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>()

export const initialState: TaskState = {};

export function reducer(state = initialState, action: Action): TaskState {
  switch (action.type) {

    default:
      return state;
  }
}
