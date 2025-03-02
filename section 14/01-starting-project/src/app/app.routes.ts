import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { leaving, NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const match: CanMatchFn = (routes,segment)=>{
  const router = inject(Router)
  const random = Math.random()
  if (random < 0.5) {
    return true
  }
  return new RedirectCommand(router.parseUrl('notfound'))
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent
  },
  {
    path: 'users/:userID',
    component: UserTasksComponent,
    canMatch:[match],
    children:[
      {
        path: '',
        redirectTo:'tasks',
        pathMatch:'full'
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [leaving]
      }
    ]
  },
  {
    path:'**',
    component:NotFoundComponent
  }
]
