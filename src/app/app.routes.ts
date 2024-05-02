import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'eventos',
                loadChildren: () => import('./eventos/eventos.routes').then(m => m.EVENTOS_ROUTES)
            },
            {
                path: 'publicaciones',
                loadChildren: () => import('./publicaciones/publicaciones.routes').then(m => m.PUBLICACIONES_ROUTES)
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
            },
            {
                path: 'multimedia',
                loadChildren: () => import('./multimedia/multimedia.routes').then(m => m.MULTIMEDIA_ROUTES)
            },
            {
                path: 'capacitaciones',
                loadChildren: () => import('./capacitaciones/capacitaciones.routes').then(m => m.CAPACITACIONES_ROUTES)
            },
            {
                path: 'configuracion',
                loadChildren: () => import('./configuracion/configuracion.routes').then(m => m.CONFIGURACION_ROUTES)
            },
            {
              path: 'reportes',
              loadChildren: () => import('./reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
          },
            {
                path: 'pqr',
                loadChildren: () => import('./pqr/pqr.routes').then(m => m.PQR_ROUTES)
            },
        ]
    },
];
