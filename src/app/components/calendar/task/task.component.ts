import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input('taskId')
  taskId?: string;
  @Input('taskTitle')
  taskTitle?: string;
  @Input('startingHour')
  startingHour?: string;

  @Output() deleteThisTaskEvent = new EventEmitter<string>();

  deleteThisTask() {
    this.deleteThisTaskEvent.emit(this.taskId);
  }
}
