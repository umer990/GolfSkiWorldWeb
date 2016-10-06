import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ResortComponent }    from './resort.component';
import { HotelsComponent }    from './resort-hotels.component';
import { RestaurantsComponent }  from './resort-restaurants.component';
import { TransportationsComponent }  from './resort-transportations.component';
import { DealsComponent }  from './resort-deals.component';
import { HttpModule } from '@angular/http';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { resortRouting } from './resort.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    resortRouting,
    DatepickerModule,
    Ng2BootstrapModule
  ],
  declarations: [
  ResortComponent,
  HotelsComponent,
  RestaurantsComponent,
  TransportationsComponent,
  DealsComponent
  ],
  providers: [
    
  ]
})
export class ResortModule {}