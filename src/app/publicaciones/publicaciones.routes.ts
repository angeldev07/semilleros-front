import { Routes } from "@angular/router";
import { PublicacionesComponent } from "./publicaciones.component";
import { BlogFormComponent } from "./components/blog-form/blog-form.component";

export const PUBLICACIONES_ROUTES: Routes = [
    {
        path: '',
        component: PublicacionesComponent
    },
    {
        path: 'nuevo-publicacion',
        component: BlogFormComponent
    }
]