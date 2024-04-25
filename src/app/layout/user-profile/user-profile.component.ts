import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="flex align-items-center gap-4 cursor-pointer">
    <div class="flex align-items-center gap-2 ">
      <img src="assets/shared/no-user.webp" alt="imagen del usuario" class="w-3rem h-3rem border-circle">
      <span>Administrador</span>
    </div>
  </div>
  
  
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent { }
