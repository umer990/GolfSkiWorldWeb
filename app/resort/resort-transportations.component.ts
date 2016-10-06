import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocationService} from '../services/LocationService';
import {transportservice} from './resort-transportations.service';

import {NgClass} from '@angular/common';
@Component({
  selector: 'trans',
  templateUrl: 'app/resort/resort-transportations.component.html',
  providers: [LocationService,transportservice],

  styleUrls: ['app/resort/resort-transportations.component.css']
})
export class TransportationsComponent implements OnInit {
 // user's Location
    baseLat: number;
    baseLng: number;
 // resort's Location
    destLat: number;
    destLng: number;
 // query parameters
    adults:number;
    children:number;
    infants:number;
    departure_date:Date;
    origin:string;
    destination:string
    return_date:Date;
    selectValue: string = "Oneway";
    selectClass: string = "ECONOMY";
    currency:string ="USD";
    flights=[];

    showDepartureAirportSuggestion: boolean = false;
    departureSuggestions:string[];
    destinationSuggestions:string[];
    showDestinationAirportSuggestion: boolean = false;
    showDepartureTimePicker: boolean = false;
    showReturnTimePicker: boolean = false;
    minDate:Date;
    showReturnDate:boolean=false;
    valid:boolean =false;
    errorMessage: string = null;

    constructor(private route: ActivatedRoute, private router: Router,private geoService: LocationService,private flightService1: transportservice) {
       this.minDate=new Date();
       this.departure_date=this.minDate;
         flightService1.getHotels()
      .subscribe(
          data=>this.flights=data["Itineraries"]),
          error=>alert(error),
        ()=>console.log("Date get finished")
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.destLat = params['lat'];
            this.destLng = params['lng'];

            this.getCurrentLocation();
        });

    }
getCurrentLocation(){

    this.geoService.getCurrentLocation()
            .subscribe(
                location => {
                    this.baseLat = this.geoService.split(location, 0);
                    this.baseLng = this.geoService.split(location, 1);
                },
                error => this.errorMessage = error);
    }

//TODO : fillin departureSuggestions
    searchDepartureAirportSuggestions(){
       console.log("showDepartureAirportSuggestion"+this.showDepartureAirportSuggestion);
       if(this.origin!=null &&this.origin!=""){
         this.showDepartureAirportSuggestion=true;
          
      }else{
        
      }
    }

//TODO : fillin destinationSuggestions
     searchDestinationAirportSuggestions(){
       if(this.destination!=null && this.destination!=""){
         this.showDestinationAirportSuggestion=true;
     }
     else{
       
     }
    }

    // TODO : autoComplete instead of this bug version
    clickStartDate(event:any) {
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
    }

    clickDepartureAirport(item: any) {
        console.log(item);
        this.origin = item;
        this.showDepartureAirportSuggestion = false;
    }
    onFocusDepartureAirport() {
        this.showDepartureAirportSuggestion = !this.showDepartureAirportSuggestion;
        console.log("onFocusDepartureAirport"+this.showDepartureAirportSuggestion);
    }

    clickDestinationAirport(item: any) {
        console.log(item);
        this.destination = item;
        this.showDestinationAirportSuggestion = false;
    }
    onFocusDestinationAirport() {
        this.showDestinationAirportSuggestion = !this.showDestinationAirportSuggestion;
    }
 // when  user choose roundTrip the returnDate input should be shown
    changeTrip(value: string): void {
        this.selectValue = value;
        console.log( this.showReturnDate);
        if(this.selectValue != "Oneway")
        this.showReturnDate=true;
         else
        this.showReturnDate=false;
      if (this.showReturnDate) {
            let date: Date = new Date();
            date.setDate(date.getDate() + 3);
            this.return_date = date;
        } else {
            this.return_date = null;
        }
    }
    changeClass(value: string): void {
        this.selectClass = value;
        
    }
    changeCurrency(value: string): void {
        this.currency = value; 
    }
    
    //TODO: return a list of flightsInfo according to the query cirtiria
    onSerach(){

    }
}
    
}