import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from "../../model/task.model";
import { tasks } from '../../shared/system.endpoints';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  findtaskById() {

  }

  fetchTasks(payload = {}) {
    return this.http.get<any>(tasks, payload);
  }

  deleteTaskById() {

  }

  editTaskById() {

  }
}
