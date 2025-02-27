import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userName = ''

  // userID = input.required<string>();
  userService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);

  // userName = computed(() => {
  //   this.userService.users.find((u) => u.id === this.userID())?.name;
  // });

  ngOnInit() {
    const sub = this.activatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.userName = this.userService.users.find((u) => u.id === param.get('userID'))?.name || '';
      }
    });

    this.destroyRef.onDestroy(()=>sub.unsubscribe());
  }

}
