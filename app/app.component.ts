import { Component ,Input, Output, EventEmitter,} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Routes} from '@angular/router';
import {LandingComponent} from './landing.component';
import { FlightCheckoutService } from './services/FlightCheckoutService';
import {HeaderComponent} from './common/header.component';

@Component({
  selector: 'my-app',
   providers:[FlightCheckoutService],
   template: `
    		   <header></header>
   				<router-outlet></router-outlet>
                  
    			<a routerLink="/admin">admin</a>
    			  
    			
    			`,
    directives:[LandingComponent,HeaderComponent]
    })
export class AppComponent { 
constructor(
  private route: ActivatedRoute,
  private router: Router,
  private flightCheckoutService: FlightCheckoutService
  ) {}
}
