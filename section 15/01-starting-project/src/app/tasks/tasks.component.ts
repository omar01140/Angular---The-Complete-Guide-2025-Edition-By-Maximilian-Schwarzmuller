import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent {
  userID = input.required<string>();
  order = input<'asc' | 'desc'>()
  tasksService = inject(TasksService);

  userTasks = computed(()=>{
    return this.tasksService.allTasks().filter((task) => task.userId === this.userID()).sort((a,b)=>{
      if (this.order()=== 'asc') {
        return a.id > b.id ? 1 : -1
      }else{
        return a.id > b.id ? -1 : 1
      }
    })
  }
  )
}
