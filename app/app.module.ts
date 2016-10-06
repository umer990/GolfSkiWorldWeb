import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AgmCoreModule} from 'angular2-google-maps/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing,
         appRoutingProviders }  from './app.routing';
import { LandingComponent }   from './landing.component';


import { AdminComponent }   from './admin.component';
import { AppComponent }   from './app.component';
import { googleMapComponent}   from './googleMap.component';
import { moviesComponent }   from './movies.component';
import { AwardsComponent }   from './awards.component';
import { ImageModalComponent }   from './ImageModel.component';
import { ResortModule }         from './resort/resort.module';
import {HeaderComponent} from './common/header.component';
import {FooterComponent} from './common/footer.component';


@NgModule({
  imports: [ 
  			BrowserModule,
  			HttpModule,
  			JsonpModule,
  			routing,
        ResortModule,
  			FormsModule,
  			 AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAK87mrQKVrqrRPg9hSiX_L0WI6yjetGFI'
    })
  			],
  declarations: [
            HeaderComponent,
            FooterComponent,
  				 AppComponent,
           LandingComponent,
  				 googleMapComponent,
  				 moviesComponent,
  				 ImageModalComponent,
  				 AdminComponent,
  				 AwardsComponent           
  				 ],
 providers: [
    appRoutingProviders
  ],
  bootstrap:    [ 
  					AppComponent 
  					]
})
export class AppModule { }
