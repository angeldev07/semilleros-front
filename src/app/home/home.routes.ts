import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { PostViewComponent } from "./post-view/post-view.component";

export const HOME_ROUTES: Routes = [
    {
        path: 'inicio',
        component: HomePageComponent
    },
    {
        path: 'publicaciones/:id',
        component: PostViewComponent
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }
]