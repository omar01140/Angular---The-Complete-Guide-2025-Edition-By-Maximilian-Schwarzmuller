import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>("form");
  private des = inject(DestroyRef)

  constructor(){
    afterNextRender(()=> {
      const savedEmail = window.localStorage.getItem("saved-email");
      if (savedEmail) {
        setTimeout(() => {
          this.form().controls["email"].setValue(savedEmail)
        }, 1);
      }

      const sub = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value)=>{window.localStorage.setItem("saved-email",value.email)}
      })
      this.des.onDestroy(()=> sub?.unsubscribe())
    })
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const email = formData.form.value.email;
    const password = formData.form.value.password;
    console.log(email, password);

    this.form().reset()
  }
}
