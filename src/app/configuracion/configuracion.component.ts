import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [],
  template: `
    <p>
      configuracion works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfiguracionComponent {

}
