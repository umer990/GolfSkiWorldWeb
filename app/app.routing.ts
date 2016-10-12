import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LandingComponent} from './landing.component';
import { AdminComponent }   from './admin.component';
import { AwardsComponent }   from './awards.component';
import { moviesComponent }   from './movies.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponent  },
  { path: 'home', component: LandingComponent ,name :'home'},
  { path: 'awards', component: AwardsComponent},
   { path: 'movie', component: moviesComponent},
   { path: 'admin', component: AdminComponent}, 
    { path: '**', redirectTo: '/home'},

];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);