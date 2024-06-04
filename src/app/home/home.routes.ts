import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { PostViewComponent } from "./post-view/post-view.component";
import { AddPqrsComponent } from "../pqr/components/add-pqr/add-pqr.component";
import { SemilleroComponent } from "../configuracion/semillero.component";

export const HOME_ROUTES: Routes = [
    {
        path: 'inicio',
        component: HomePageComponent
    },
    {
        path: 'semillero',
        component: SemilleroComponent
    },
    {
        path: 'publicaciones/:id',
        component: PostViewComponent
    },
    {
      path: 'pqr',
      component: AddPqrsComponent
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }
]
