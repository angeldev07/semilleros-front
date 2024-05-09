import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Album } from '../../api/multimedia';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    CardModule
  ],
  template: `
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-4" *ngFor="let album of albums">
        <p-card [header]="album.titulo" [subheader]="album.descripcion" [style]="{ width: '300px' }">
          <ng-template pTemplate="header">
            <img alt="Album" src="https://cdn.icon-icons.com/icons2/1379/PNG/512/folderblue_92960.png" width="80px" />
          </ng-template>
          <p>Fecha de creación: {{ album.fechaCreacion | date }}</p>
          <p>Fecha de actualización: {{ album.fechaActualizacion | date }}</p>
          <ng-template pTemplate="footer">
            <div class="flex gap-3 mt-1">
              <p-button label="Ver más" icon="pi pi-eye" class="w-full" styleClass="w-full" (click)="verContenidoMultimedia(album.id)"></p-button>
              <p-button label="Eliminar" icon="pi pi-trash" severity="danger" class="w-full" styleClass="w-full" (click)="eliminarAlbum(album.id)"></p-button>
            </div>
          </ng-template>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent implements OnInit {
  @Input() albums: Album[] = [];
  @Output() deleteAlbum = new EventEmitter<number>();

  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {}

  verContenidoMultimedia(albumId: number) {
    console.log('Ver contenido multimedia del álbum:', albumId);
  }

  eliminarAlbum(albumId: number) {
    this.deleteAlbum.emit(albumId);
  }
}