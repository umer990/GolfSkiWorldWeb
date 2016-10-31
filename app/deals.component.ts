import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';


import {DealsService1} from './deal.service';



@Component({
	selector:'deals',
	templateUrl:'app/deals.component.html',
    providers:[DealsService1]

	
})

export class dealsComponent{
    dealsList:any;
	constructor(private _DealsService:DealsService1 ) {

        this._DealsService.getLastMinutes()
            .subscribe(
                deals => {this.dealsList=deals
                    }),
                error => console.log(error);

    }
 
}