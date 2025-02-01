import{ NgModule }from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations:[AppComponent, HeaderComponent, UserComponent],
  bootstrap:[AppComponent],
  imports:[BrowserModule, TasksComponent]
})
export class AppModule {}
