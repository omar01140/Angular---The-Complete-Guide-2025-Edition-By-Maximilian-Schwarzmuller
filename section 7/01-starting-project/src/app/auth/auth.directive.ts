import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'})

  private auth = inject(AuthService)
  private  tempRef = inject(TemplateRef)
  private  viewRef = inject(ViewContainerRef)

  constructor() {
    effect(()=>{
      if (this.userType() === this.auth.activePermission()) {
        this.viewRef.createEmbeddedView(this.tempRef)
      }else{
        this.viewRef.clear()
      }
    })
  }

}
