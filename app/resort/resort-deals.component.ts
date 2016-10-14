import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Observable}from 'rxjs/Observable';


import 'rxjs/Rx';

@Component({
    selector: 'deals',
    templateUrl: 'app/resort/resort-deals.component.html',
   // providers: [DealService],
    styleUrls: ['app/resort/resort-deals.component.css']
})
export class DealsComponent implements OnInit{ 

constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {}


	ngOnInit() {

  
}


	
}