import { Routes } from '@angular/router';
import {AboutComponent} from './features/about/about.component';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';
import {PokemonComponent} from './features/pokemon/pokemon.component';
import {LoginComponent} from './features/login/login.component';
import {HomeComponent} from './features/home/home.component';
import {ProfileComponent} from './features/profile/profile.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'pokemon/:id', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path:'profile', component:ProfileComponent, canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent }
];
