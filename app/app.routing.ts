import { ModuleWithProviders } from 'angular2/core';
import { Routes, RouterModule } from 'angular2/router';

import {LandingComponent} from './landing.component'

import {PageNotFoundComponent} from './pagenotfound.component'

const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent },

  { path: 'author/:id', component: AuthorsComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);