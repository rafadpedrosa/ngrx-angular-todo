import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser, userName } from '../auth/redux/auth.selectors';
import { AuthService } from '../auth/service/auth.service';
import { Task } from '../model/task.model';
import { State } from '../reducers';
import { RequestAllTasks } from '../task/redux/task.actions';
import { allTasks } from '../task/redux/task.selectors';
import { TaskService } from '../task/service/task.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: [ './private.component.scss' ]
})
export class PrivateComponent implements OnInit {

  username$: Observable<string>;
  tasks$: Observable<Task[]>;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    const requestAllTasks = (user) => {
      if (user) {
        this.store.dispatch(new RequestAllTasks({ userId: user.userId }));
      }
    };

    this.store.pipe(select(selectUser)).subscribe(requestAllTasks);

    this.tasks$ = this.store.pipe(select(allTasks));
    this.username$ = this.store.pipe(select(userName));

    // this.tasks$.subscribe((value: any) => this.tasks = value);
  }

  logout() {
    this.authService.logout();
  }
}
