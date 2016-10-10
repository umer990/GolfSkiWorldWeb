import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LandingComponent} from './landing.component';
import { AdminComponent }   from './admin.component';
import { AwardsComponent }   from './awards.component';

const appRoutes: Routes = [
{
   path: '',
    component:LandingComponent,

children: [
{ path: 'home', component: LandingComponent }
  ,{
    path: 'awards',
    component: AwardsComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }]
},
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);