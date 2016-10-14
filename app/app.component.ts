import { Component ,Input, Output, View, EventEmitter,} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {LandingComponent} from './landing.component';
import { FlightCheckoutService } from './services/FlightCheckoutService';

@Component({
  selector: 'my-app',
   providers:[FlightCheckoutService],
   template: `
    		   
   				<router-outlet></router-outlet>
                  
    			<a routerLink="/admin">admin</a>
    			  
    			
    			`,
    directives:[LandingComponent]
    })
export class AppComponent { 
constructor(
  private route: ActivatedRoute,
  private router: Router,
  private flightCheckoutService: FlightCheckoutService
  ) {}
}
