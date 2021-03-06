import { NgModule}      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AgmCoreModule} from 'angular2-google-maps/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';
//import {SimplePageScroll} from 'ng2-simple-page-scroll' ;
import { routing,
         appRoutingProviders }  from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

		 
import { LandingComponent }   from './landing.component';
import { AdminComponent }   from './admin.component';
import { AppComponent }   from './app.component';
import { googleMapComponent}   from './googleMap.component';
import { moviesComponent }   from './movies.component';
import { AwardsComponent }   from './awards.component';
import {dealsComponent} from './deals.component'
import { ImageModalComponent }   from './ImageModel.component';
import { ResortModule }         from './resort/resort.module';
import {HeaderComponent} from './common/header.component';
import { FlightCheckOut }  from './CheckOut';
//import {FooterComponent} from './common/footer.component';


@NgModule({
  imports: [ 
	  		CommonModule,
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
            AppComponent,
           	LandingComponent,
  			googleMapComponent,
  			moviesComponent,
  			ImageModalComponent,
  			AdminComponent,
  			AwardsComponent  ,
			  dealsComponent,
			  FlightCheckOut,
			UPLOAD_DIRECTIVES,
//			SimplePageScroll
			
			        
  				 ],
 providers: [appRoutingProviders,{provide: LocationStrategy, useClass: HashLocationStrategy}

 ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
