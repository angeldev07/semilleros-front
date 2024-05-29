import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-redes-sociales',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './redes-sociales.component.html',
  styleUrl: './redes-sociales.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedesSocialesComponent implements OnInit {

  ngOnInit(): void { }

}
