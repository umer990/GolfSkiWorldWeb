import { Component,OnInit,ElementRef ,ViewChild,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransportationService } from '../services/TransportationService';

import {NgClass} from '@angular/common';
import { Subscription }   from 'rxjs/Subscription';

import {hotelService} from './resort-hotels.service';
import {Airport, AirportInfo} from './Airport';
import {LowFareSearch,ItineraryWithPrice,Itinerary} from './LowFareSearch';
import { FlightCheckoutService } from '../services/FlightCheckoutService';

@Component({
  selector: 'hotels',
  templateUrl: 'app/resort/resort-hotels.component.html',
  styleUrls: ['app/resort/resort-hotels.component.css'],
  providers:[hotelService],
  host: {
   // '(document:click)': 'onClick($event)',
  }
})


export class HotelsComponent implements OnInit, OnDestroy {

    Hotels=[];
    destLat: number;
    destLng: number;
    minDate:Date = new Date();
    departure_date:Date;
    return_date:Date;
    showReturnTimePicker:boolean;
    showDepartureTimePicker:boolean;
    showReturnDate:boolean=false;
    room:number=1;
    radius:number=42;
    numberOfResults:number=50;
    currency:string="EUR";
    hotelsList:any;
    @ViewChild('departDateBox') departDateBox: any;
    @ViewChild('departDatepicker') departDatepicker: any;
    @ViewChild('returnDateBox') returnDateBox: any;
    @ViewChild('returnDatepicker') returnDatepicker: any;
    userLat: number;
    userLng: number;
   

imageUrl=function(url){
  
  return "http://"+(url.split('{',2)[0]+url.split('{',2)[1]+'rmt.jpg').replace(':', ''));
}

constructor(private route: ActivatedRoute, private router: Router,private _hotelService: hotelService) {
     
   
    

  /*this._hotelService.getHotels1()
      .subscribe(
          data=>this.Hotels=data),
          error=>alert(error),
        ()=>console.log("Hotels get finished")*/
    }

onSearch() {

  this._hotelService.onSearch(this.destLng,this.destLat,this.radius,this.departure_date,
                              this.return_date,this.currency,this.numberOfResults)
      .subscribe(
          data=>this.hotelsList=data),
          error=>alert(error),
        ()=>console.log("Hotels get finished")

 /*       
this.searchService= this.service.onSearch(this.departAirport.value,this.arrivalAirport.value,
               this.departure_date,this.return_date,this.selectClass,this.adults,this.children,this.infants,this.currency

       ).subscribe(data=>{this.result=this.convertLowFareSearch(data); console.log(this.result)},
           error => this.errorMessage = error
       );*/
}
  ngOnInit(): void {
          this.route.queryParams.subscribe(params => {
          this.destLat = params['lat'];
          this.destLng = params['lng'];
        });
        this.getCurrentService();
        
    }

getCurrentService(): void {

    if (window.navigator && window.navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                                    pos=>
                                    {   this.userLat=pos.coords.latitude,
                                        this.userLng=pos.coords.longitude;
                                        //this.findUserAirport();
                                        console.log("ipInfo"+this.userLat+this.userLng);
                                    });
            }
    else{
        this.userLat =  0.0;
        this.userLng = 0.0; 
      //  this.findUserAirport();                  
    };
       /* clickStartDate(event:any) {
        console.log("event:"+event);
        this.departure_date= event;
        console.log("depart:"+this.departure_date);
            this.showDepartureTimePicker = false;
        }
        onFocusStartDate() {
            this.showDepartureTimePicker = !this.showDepartureTimePicker;
        }
        clickReturnDate(event:any) {
        this.return_date= event;
            this.showReturnTimePicker = false;
        }
        onFocusReturnDate() {
            this.showReturnTimePicker = !this.showReturnTimePicker;
        }*/
	
}
 ngOnDestroy() {
    // prevent memory leak when component destroyed
  /*
    if(this. getCurrentLocationService!=null)
   this. getCurrentLocationService.unsubscribe();
 if(this. findUserAirportService!=null)
    this.findUserAirportService.unsubscribe();
  if(this. findDestAirportService!=null)
    this.findDestAirportService.unsubscribe();
  if(this. searchService!=null)
    this.searchService.unsubscribe();
  if(this. showSuggestionsService!=null)
    this.showSuggestionsService.unsubscribe();
  if(this. showDestSuggestionsService!=null)
    this.showDestSuggestionsService.unsubscribe();
    */
  }
 
 onFocusStartDate() {
        this.showDepartureTimePicker = !this.showDepartureTimePicker;
    }
 onFocusReturnDate() {

        this.showReturnTimePicker = !this.showReturnTimePicker;
    }
      clickReturnDate(event:any) {
      this.return_date= event;
        this.showReturnTimePicker = false;
     
    }
clickStartDate(event:any) {
      console.log("event:"+event);
     
      this.departure_date= event;
      this.showReturnDate=true;
      if (this.showReturnDate) {

           let date: Date = new Date(this.departure_date.getFullYear(),this.departure_date.getMonth(),this.departure_date.getDate()+1);
            this.return_date = date;
        }
      console.log("depart:"+this.departure_date);
      console.log("return:"+this.return_date);
        this.showDepartureTimePicker = false;
 
    }
    changeTrip(value: string): void {
      //  this.selectValue = value;
        console.log( this.showReturnDate);
        //if(this.selectValue != "Oneway")
        this.showReturnDate=true;
         //else
        //this.showReturnDate=false;
      if (this.showReturnDate) {

            //let date: Date = new Date();
            let date: Date = new Date(this.departure_date.getFullYear(),this.departure_date.getMonth(),this.departure_date.getDate()+1);
            
            //date.setDate(this.departure_date.getDate() + 3);
            this.return_date = date;
        } else {
            this.return_date = null;
        }

    }
 /*
  validForm():boolean{

if((this.adults+this.children+this.infants)>0 && this.arrivalSearch!=null && this.selectValue!=" "&& this.selectClass!=" "&&this.departSearch!=" "
  &&this.departure_date!=null ){
 this.valid=true;
}
else 
{
  this.valid=false;
}

console.log("valid:"+this.valid);
return this.valid;

}*/

}