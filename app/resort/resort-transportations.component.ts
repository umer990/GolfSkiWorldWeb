import { Component,OnInit,ElementRef ,ViewChild,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransportationService } from '../services/TransportationService';

import {NgClass} from '@angular/common';
import { Subscription }   from 'rxjs/Subscription';

import {Airport, AirportInfo} from './Airport';
import {LowFareSearch,ItineraryWithPrice,Itinerary} from './LowFareSearch';
import { FlightCheckoutService } from '../services/FlightCheckoutService';

@Component({
  selector: 'trans',
  templateUrl: 'app/resort/resort-transportations.component.html',
  providers: [TransportationService],
  host: {
    '(document:click)': 'onClick($event)',
  },
  styleUrls: ['app/resort/resort-transportations.component.css']
})
export class TransportationsComponent implements OnInit, OnDestroy {
    @ViewChild('departDateBox') departDateBox: any;
    @ViewChild('departDatepicker') departDatepicker: any;
    @ViewChild('returnDateBox') returnDateBox: any;
    @ViewChild('returnDatepicker') returnDatepicker: any;
    userLat: number;
    userLng: number;
    destLat: number;
    destLng: number;
    valid=false;
    showDepartureAirportSuggestion: boolean = false;
    showDestinationAirportSuggestion: boolean = false;
    showDepartureTimePicker: boolean = false;
    showReturnTimePicker: boolean = false;
    minDate:Date;
    departAirportList:Airport[];
    departSearch:string;
    departureSuggestions:AirportInfo[];
    destinationSuggestions:AirportInfo[];
    arrivalAirportList:Airport[];
    arrivalSearch:string;
    showReturnDate:boolean=false;
    errorMessage: string = null;
    adults:number=1;
    children:number=0;
    infants:number=0;
    departAirport:AirportInfo= new AirportInfo();
    departure_date:Date= new Date();
    arrivalAirport:AirportInfo= new AirportInfo();
    return_date:Date;
    selectValue: string = "Oneway";
    selectClass: string = "ECONOMY";
    currency:string="USD";
    result: ItineraryWithPrice[];
    
    getCurrentLocationService:Subscription;
    findUserAirportService:Subscription;
    findDestAirportService:Subscription;
    searchService:Subscription;
    showSuggestionsService:Subscription;
    showDestSuggestionsService:Subscription;

    constructor(private route: ActivatedRoute, private router: Router, _eref: ElementRef, 
      private service: TransportationService,
     
      private flightCheckoutService: FlightCheckoutService) {
       this.minDate=this.departure_date;
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
              navigator.geolocation.getCurrentPosition(pos=>{this.userLat=pos.coords.latitude,this.userLng=pos.coords.longitude;this.findUserAirport();console.log("ipInfo"+this.userLat+this.userLng);});
         }
else{
     this.userLat =  0.0;
     this.userLng = 0.0; 
     this.findUserAirport();                  
};



         

      /* this.getCurrentLocationService= this.geoservice.getCurrentLocation().subscribe(location => {
            this.userLat = this.split(location, 0);
            this.userLng = this.split(location, 1);
         this.findUserAirportService=  this.service.findAirport(this.userLat, this.userLng).subscribe(location => {
                console.log("user airport");
                console.log(location);
                this.departAirportList = location;
                if (this.departAirportList != null) {
                    this.departAirport.value = this.departAirportList[0].airport;
                     this.departAirport.label=this.departAirportList[0].airport_name;
                    this.departSearch=this.departAirport.value;
                }
            }, error => this.errorMessage = error);
        }, error => this.errorMessage = error);*/
       this.findDestAirportService= this.service.findAirport(this.destLat, this.destLng).subscribe(location => {
            console.log("dest airport");
            console.log(location);
            this.arrivalAirportList = location;
            if (this.arrivalAirportList != null) {
             
                this.arrivalAirport.value = this.arrivalAirportList[0].airport;
                 this.arrivalAirport.label=this.arrivalAirportList[0].airport_name;
                this.arrivalSearch=this.arrivalAirport.value;
            }
        }, error => this.errorMessage = error);
    }
    onSearch() {

     this.searchService= this.service.onSearch(this.departAirport.value,this.arrivalAirport.value,
               this.departure_date,this.return_date,this.selectClass,this.adults,this.children,this.infants,this.currency

       ).subscribe(data=>{this.result=this.convertLowFareSearch(data); console.log(this.result)},
           error => this.errorMessage = error
       );

    }

    findUserAirport(){
       this.findUserAirportService=  this.service.findAirport(this.userLat, this.userLng).subscribe(location => {
                console.log("user airport");
                console.log(location);
                this.departAirportList = location;
                if (this.departAirportList != null) {
                    this.departAirport.value = this.departAirportList[0].airport;
                     this.departAirport.label=this.departAirportList[0].airport_name;
                    this.departSearch=this.departAirport.value;
                }
            }, error => this.errorMessage = error);
    }
   

    searchDepartureAirportSuggestions(){
       console.log("showDepartureAirportSuggestion"+this.showDepartureAirportSuggestion);
       if(this.departSearch!=null &&this.departSearch!=""){
         this.showDepartureAirportSuggestion=true;
        this. showSuggestionsService= this.service.showSuggestions(this.departSearch).subscribe(location => {
           this.departureSuggestions=location;
            console.log(location);
       }, error => this.errorMessage = error);
      }else{
         this.departureSuggestions=null;
      }
    }

     searchDestinationAirportSuggestions(){
       console.log("showDestinatoinSuggestions");

       if(this.arrivalSearch!=null && this.arrivalSearch!=""){
         this.showDestinationAirportSuggestion=true;
         this. showDestSuggestionsService= this.service.showSuggestions(this.arrivalSearch).subscribe(location => {
           this.destinationSuggestions=location;
            console.log(location);
        }, error => this.errorMessage = error);
     }
     else{
       this.destinationSuggestions=null;
     }
    }
    clickStartDate(event:any) {
      console.log("event:"+event);
      this.departure_date= event;
      if (this.showReturnDate) {

            let date: Date = new Date();
            date.setDate(this.departure_date.getDate() + 3);
            this.return_date = date;
        }
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
    }
    clickDepartureAirport(item: AirportInfo) {
        console.log(item);
        this.departSearch = item.value;
        this.departAirport=item;
        this.showDepartureAirportSuggestion = false;

    }
    onFocusDepartureAirport() {
        this.showDepartureAirportSuggestion = !this.showDepartureAirportSuggestion;
        console.log("onFocusDepartureAirport"+this.showDepartureAirportSuggestion);
    }
    clickDestinationAirport(item: AirportInfo) {
        console.log(item);
         this.arrivalSearch = item.value;
        this.arrivalAirport=item;
       
        this.showDestinationAirportSuggestion = false;
       
    }
    onFocusDestinationAirport() {
        this.showDestinationAirportSuggestion = !this.showDestinationAirportSuggestion;
    }
 
    changeTrip(value: string): void {
        this.selectValue = value;
        console.log( this.showReturnDate);
        if(this.selectValue != "Oneway")
        this.showReturnDate=true;
         else
        this.showReturnDate=false;
      if (this.showReturnDate) {

            let date: Date = new Date();
            date.setDate(this.departure_date.getDate() + 3);
            this.return_date = date;
        } else {
            this.return_date = null;
        }

    }
    changeClass(value: string): void {
        this.selectClass = value;
        //this.query.travel_class = this.selectClass;


    }

 onClick(event :MouseEvent) { 
   this.showDepartureAirportSuggestion  = false;
    this.showDestinationAirportSuggestion  = false;
    this.showDepartureTimePicker  = false;
    this.showReturnTimePicker  = false;
    if (this.departDateBox!=null&&this.departDateBox.nativeElement!=null&&this.departDateBox.nativeElement.contains(event.target)) { // check click origin
            this.showDepartureTimePicker  = true;
        }
       else if (this.departDatepicker!=null&&this.departDatepicker.nativeElement!=null&&this.departDatepicker.nativeElement.contains(event.target)) { // check click origin
            this.showDepartureTimePicker  = true;
        }
        else if (this.returnDateBox!=null&&this.returnDateBox.nativeElement!=null&&this.returnDateBox.nativeElement.contains(event.target)) { // check click origin
            this.showReturnTimePicker  = true;
        }
        else if (this.returnDatepicker!=null&&this.returnDatepicker.nativeElement!=null&&this.returnDatepicker.nativeElement.contains(event.target)) { // check click origin
            this.showReturnTimePicker  = true;
        }




}


 convertLowFareSearch(entity:LowFareSearch):ItineraryWithPrice[]{
       this.currency=entity.currency;
       let result: Array<ItineraryWithPrice>=new Array<ItineraryWithPrice>();
    entity.results.forEach(function(a){
      let b=a;
      b.itineraries.forEach( function(c :Itinerary){
        let item :ItineraryWithPrice= new ItineraryWithPrice();
        item.fare=b.fare;

        item.total_price=b.fare.total_price;
        item.outFlights=c.outbound.flights;
        
        //item.inFlights=c.inbound.flights;
        item.out_marketing_airline=item.outFlights[0].marketing_airline;
        let departs_at=item.outFlights[0].departs_at;
        //item.departs_at=departs_at;
        item.out_departs_at=item.spilt(departs_at,0);
        item.out_departs_time=item.spilt(departs_at,1);

        let depart:Date=new Date(item.out_departs_at);
  
         depart.setHours(item.spiltTime(item.out_departs_time,0));
         depart.setMinutes(item.spiltTime(item.out_departs_time,1));
                 
        item.out_origin_airport=item.outFlights[0].origin.airport;
        item.out_origin_terminal=item.outFlights[0].origin.terminal;
        item.out_marketing_airline=item.outFlights[0].marketing_airline;
        item.out_flight_number=item.outFlights[0].flight_number;
        item.out_aircraft=item.outFlights[0].aircraft;
        let lastIndex=item.outFlights.length-1;
        item.out_destination_airport=item.outFlights[lastIndex].destination.airport;
        item.out_destination_terminal=item.outFlights[lastIndex].destination.terminal;
        let arrives_at=item.outFlights[lastIndex].arrives_at;
        //item.arrives_at=arrives_at;
        item.out_arrives_at=item.spilt(arrives_at,0);
        item.out_arrives_time=item.spilt(arrives_at,1);
                let arrives:Date=new Date(item.out_departs_at);
  
                arrives.setHours(item.spiltTime(item.out_arrives_time,0));
                arrives.setMinutes(item.spiltTime(item.out_arrives_time,1));

        item.out_stops=lastIndex;
        item.out_duration=item.getHoursBetween(depart,arrives);

if(c.inbound!=null){
item.include_in_bound=true;
  item.inFlights=c.inbound.flights;
   //console.log("inflights is not null");
   // console.log(item.inFlights);
  item.in_marketing_airline=item.inFlights[0].marketing_airline;
        let departs_at=item.inFlights[0].departs_at;
        //item.departs_at=departs_at;
        item.in_departs_at=item.spilt(departs_at,0);
        item.in_departs_time=item.spilt(departs_at,1);

        let depart:Date=new Date(item.in_departs_at);
  
         depart.setHours(item.spiltTime(item.in_departs_time,0));
         depart.setMinutes(item.spiltTime(item.in_departs_time,1));
                 
        item.in_origin_airport=item.inFlights[0].origin.airport;
        item.in_origin_terminal=item.inFlights[0].origin.terminal;
        item.in_marketing_airline=item.inFlights[0].marketing_airline;
        item.in_flight_number=item.inFlights[0].flight_number;
        item.in_aircraft=item.inFlights[0].aircraft;
        let lastIndex=item.inFlights.length-1;
        item.in_destination_airport=item.inFlights[lastIndex].destination.airport;
        item.in_destination_terminal=item.inFlights[lastIndex].destination.terminal;
        let arrives_at=item.inFlights[lastIndex].arrives_at;
        //item.arrives_at=arrives_at;
        item.in_arrives_at=item.spilt(arrives_at,0);
        item.in_arrives_time=item.spilt(arrives_at,1);
                let arrives:Date=new Date(item.in_departs_at);
  
                arrives.setHours(item.spiltTime(item.in_arrives_time,0));
                arrives.setMinutes(item.spiltTime(item.in_arrives_time,1));

        item.in_stops=lastIndex;
        item.in_duration=item.getHoursBetween(depart,arrives);

}
        result.push(item);
      });

    });
    return result;

      }

onClickInfo(item:ItineraryWithPrice){
  item.showDetails=!item.showDetails;
}

onSelectItineraryWithPrice(item:ItineraryWithPrice){
  this.flightCheckoutService.setItineraryInfo(item,this.adults,this.children,this.infants);
  
  let link = ['/checkout'];
        this.router.navigate(link);

   }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
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
    
  }


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

}
}