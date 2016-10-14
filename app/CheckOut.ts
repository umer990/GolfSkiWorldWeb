import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute, NavigationExtras} from '@angular/router';

import {MouseEvent} from 'angular2-google-maps/core';
import {FlightCheckoutService} from './services/FlightCheckoutService'
import {ItineraryWithPrice} from './resort/LowFareSearch';

  
@Component({
    selector: 'checkout',
    templateUrl: 'app/checkout.component.html',
    providers:[],
})
export class FlightCheckOut implements OnInit {
item:ItineraryWithPrice;
adults:number;
children:number;
infants:number;
order:OrderInfo= new OrderInfo();
 constructor(
        private router: Router,
         private route: ActivatedRoute,private flightCheckoutService: FlightCheckoutService) {

 }

    ngOnInit(): void {
if(this.flightCheckoutService.selectItem!=null){
	this.item=this.flightCheckoutService.selectItem;
	this.adults=this.flightCheckoutService.adults;
	this.children=this.flightCheckoutService.children;
	this.infants=this.flightCheckoutService.infants;

	if(this.adults>0){
		this.order.adults= new Array<Person>();
		for(let i=0;i<this.adults;i++){
			let person:Person= new Person();
			person.type="Adult";
			this.order.adults.push(person);
		}

	}else{
		this.order.adults= null;
	}

	if(this.children>0){
		this.order.children= new Array<Person>();
       for(let i=0;i<this.children;i++){
			let person:Person= new Person();
			person.type="Child";
			this.order.children.push(person);
		}

	}
	else{
		this.order.children= null;
	}
}
    	
        }



}


 class OrderInfo{
 	adults:Array<Person>;
 	children:Array<Person>;
 	mobileNumber:string;
 	hometelephone:string;
 	emailAdress:string;

}

 class Person{
 	type:string;
 	firstName:string;
 	lastName:string;
 	gender:string;
 }