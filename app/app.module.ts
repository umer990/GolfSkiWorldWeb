import {Component} from 'angular2/core';
import { NgModule } from 'angular2/core';
/**import { BrowserModule }  from 'angular2/platform-browser';
import { FormsModule }    from 'angular2/forms';
*/
import { routing,
         appRoutingProviders } from './app.routing';


import { HttpModule, JsonpModule } from 'angular2/http';

import { AppComponent }  from './app.component';

import {LandingComponent} from './landing.component'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    LandingComponent,
   
  
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
