import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Evento {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div *ngFor="let evento of eventos" class="evento">
      <h2>{{ evento.title }} - {{ evento.date }}</h2>
      <img [src]="evento.imageUrl" alt="Foto del evento">
      <p>{{ evento.description }}</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
    .evento {
      margin-bottom: 20px;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventosComponent {
  eventos: Evento[] = [
    {
      id: 1,
      title: 'Encuentro de Innovadores en Redes',
      date: '2024-03-15',
      description: 'Tiene como objetivo fomentar la colaboración y el networking entre profesionales o estudiantes interesados en las redes.',
      imageUrl: 'https://www.udea.edu.co/wps/wcm/connect/udea/c722ec80-7f16-4bdf-92ac-d7547cfd011d/1/Pata-boletines.png?MOD=AJPERES'
    },
    {
      id: 2,
      title: 'Simposio sobre Redes 5G',
      date: '2024-04-22',
      description: 'Donde se discuten temas de actualidad o investigación en el campo de las redes.',
      imageUrl: 'https://www.mypress.mx/img/articulos/7369.jpg'
    }

    

  ];
}
