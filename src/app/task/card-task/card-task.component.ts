import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: [ './card-task.component.css' ]
})
export class CardTaskComponent implements OnInit {

  @Input() task: Task;

  isEditMode: false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

}
