import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PostViewComponent } from './home/post-view/post-view.component';

export const routes: Routes = [
    {
        path: 'admin', component: LayoutComponent,
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
                path: 'pqr',
                loadChildren: () => import('./pqr/pqr.routes').then(m => m.PQR_ROUTES)
            },
            {
                path:'',
                pathMatch: 'full',
                redirectTo: 'publicaciones'
            }
        ]
    },
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./home/home.routes').then(h => h.HOME_ROUTES)
    },
];
