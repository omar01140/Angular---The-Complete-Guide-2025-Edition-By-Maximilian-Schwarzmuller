import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  userID = input.required<string>();
  tasksService = inject(TasksService);

  userTasks = computed(()=>{
    return this.tasksService.allTasks().filter((task) => task.userId === this.userID())
  }
  )
}
