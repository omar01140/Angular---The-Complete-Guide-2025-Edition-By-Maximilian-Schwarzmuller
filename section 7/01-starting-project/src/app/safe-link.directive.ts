import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onLinkClick($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });

  constructor() {
    console.log('hey');
  }
  onLinkClick(event: MouseEvent) {
    const leave = window.confirm('Did you want to leave this page?');

    if (leave) {
      const adress = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = adress + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
