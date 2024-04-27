import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pqr',
  standalone: true,
  imports: [],
  template: `
    <p>
      pqr works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PqrComponent {

}
