import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userID = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submited = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userID()
    );
    this.submited = true
    this.router.navigate(['users',this.userID(),'tasks'], {
      replaceUrl:true
    })
  }
}

export const leaving: CanDeactivateFn<NewTaskComponent>= (component)=>{
  if (component.submited) {
    return true;  
  }
  if (component.enteredDate() || component.enteredSummary() || component.enteredTitle()) {
    return window.confirm('Your task will not be saved, Are you sure to leave?')
  }
  return true;
}
