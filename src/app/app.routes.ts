import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {
        path: 'admin', component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
            },
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
            {
                path: 'semilleros',
                loadChildren: () => import('./semilleros/semilleros.routes').then(m => m.SEMILLEROS_ROUTES)
            },
            {
                path: 'normatividad',
                loadChildren: () => import('./normatividad/normatividad-routing.module').then(m => m.NormatividadRoutingModule)
            },
            {    
                 path: 'redes-sociales',
                 loadChildren: () => import('./redes-sociales/redes-sociales.routes').then(m => m.REDES_SOCIALES_ROUTES)
            },
            {
                path:'',
                pathMatch: 'full',
                redirectTo: 'dashboard'
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
