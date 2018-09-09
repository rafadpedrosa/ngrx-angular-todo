import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { Task } from '../model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: [ './task.component.css' ]
})
export class TaskComponent implements OnInit, OnDestroy {

  filteredTasks: Task[];
  searchInput: string;
  search$ = new Subject<string>();

  private tasks: Task[];

  constructor() {
  }

  @Input() set tasksData(tasks) {
    this.tasks = tasks;
    this.filteredTasks = tasks;
  }

  search(event) {
    const searchValue = event.target.value.toUpperCase();
    this.search$.next(searchValue);
  }

  ngOnInit() {
    this.filteredTasks = this.tasks;
    this.initSearch();
  }

  ngOnDestroy() {
  }

  private initSearch() {
    const filterTasks = searchValue => {
      const searchValuePattern = `${searchValue}`;
      this.filteredTasks = [];
      return this.tasks.filter(task => task.title.toUpperCase().match(searchValuePattern));
    };

    const setFilteredTasks = tasks => {
      console.log('tasks', tasks);
      this.filteredTasks.push(tasks);
    };

    this.search$.pipe(
      debounceTime(300),
      switchMap(filterTasks),
    ).subscribe(setFilteredTasks);
  }

}
