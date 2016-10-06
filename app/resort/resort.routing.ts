import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResortComponent }    from './resort.component';
import { HotelsComponent }    from './resort-hotels.component';
import { RestaurantsComponent }  from './resort-restaurants.component';
import { TransportationsComponent }  from './resort-transportations.component';
import { DealsComponent }  from './resort-deals.component';
const resortRoutes: Routes = [
  
  { path: 'resort',  component: ResortComponent,
	children: [
		{ path: '',  component: HotelsComponent },
		{ path: 'hotels',  component: HotelsComponent },
		{ path: 'restaurants', component: RestaurantsComponent },
        { path: 'transportations',  component: TransportationsComponent },
        { path: 'deals', component: DealsComponent }
		
	]  }
  
];
export const resortRouting: ModuleWithProviders = RouterModule.forChild(resortRoutes);