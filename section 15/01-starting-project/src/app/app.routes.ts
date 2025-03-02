import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { leaving, NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const match: CanMatchFn = (routes,segment)=>{
  const router = inject(Router)
  const random = Math.random()
  if (random < 5) {
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
        loadComponent: ()=>import('./tasks/tasks.component').then(mod=>mod.TasksComponent)
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
