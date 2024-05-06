import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { Album } from './api/multimedia';
import { MultimediaService } from './services/multimedia.service';

@Component({
  selector: 'app-multimedia',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AddAlbumComponent,
    //AlbumListComponent,
  ],
  template: `
    <section class="card flex justify-content-between align-items-center px-4">
      <h2 class="mb-0 text-2xl md:text-3xl">Álbumes</h2>
      <p-button
        label="Agregar"
        icon="pi pi-plus"
        [iconPos]="'right'"
        [outlined]="true"
        (onClick)="openAddAlbumDialog = true"
      ></p-button>
    </section>
   
    <app-add-album
      (saveAlbum)="saveAlbum($event)"
      [(visible)]="openAddAlbumDialog"
    ></app-add-album>
  `,
  styles: ``,
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaComponent implements OnInit {
  openAddAlbumDialog = false;
  albumList: Album[] = [];

  constructor(
    private multimediaService: MultimediaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.multimediaService.getAlbums().subscribe(
      (albums: Album[]) => {
        this.albumList = albums;
      },
      (error: any) => {
        console.error('Error al obtener los álbumes:', error);
      }
    );
  }

  saveAlbum(album: Album) {
    this.albumList.push(album);
    this.messageService.add({
      severity: 'success',
      summary: 'Álbum creado',
      detail: 'El álbum se ha creado correctamente',
    });
  }

  deleteAlbum(albumId: number) {
    this.multimediaService.deleteAlbum(albumId).subscribe(
      () => {
        this.albumList = this.albumList.filter((album) => album.id !== albumId);
        this.messageService.add({
          severity: 'success',
          summary: 'Álbum eliminado',
          detail: 'El álbum se ha eliminado correctamente',
        });
      },
      (error: any) => {
        console.error('Error al eliminar el álbum:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error al eliminar',
          detail: 'Ha ocurrido un error al eliminar el álbum',
        });
      }
    );
  }
}