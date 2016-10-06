import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'resort',
  templateUrl: 'app/resort/resort.component.html',
  styleUrls: ['app/resort/resort.component.css']
})
export class ResortComponent implements OnInit{ 
	

	constructor(
  private route: ActivatedRoute,
  private router: Router) {}


	ngOnInit() {

       this.route.queryParams.subscribe(
           params=>{
           	this.lat=params['lat'];
           	this.lng=params['lng'];
           }
           
       	);  
}

	goBack(): void {
        let link = ['/home'];
        this.router.navigate(link);
    }


   lat:string;
   lng:string;
}

