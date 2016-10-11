import { Component ,Input, Output, View, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {LandingComponent} from './landing.component';
import {ImageModalComponent} from './ImageModel.component';






@Component({
  selector: 'my-app',
   template: `
    		   
   				<router-outlet></router-outlet>
                  
    			<a routerLink="/admin">admin</a>
    			  
    			
    			`,
    directives:[LandingComponent,ImageModalComponent]
    })
export class AppComponent { 
constructor(
  private route: ActivatedRoute,
  private router: Router) {}
}
