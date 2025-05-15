import { Routes } from '@angular/router';
import {AboutComponent} from './features/about/about.component';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';
import {HomeComponent} from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon/:id', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];
