import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {hotelService} from './resort-hotels.service';

@Component({
  selector: 'hotels',
  templateUrl: 'app/resort/resort-hotels.component.html',
    styleUrls: ['app/resort/resort-hotels.component.css'],
  providers:[hotelService]
})

export class HotelsComponent implements OnInit { 
    Hotels=[];
    destLat: number;
    destLng: number;
    minDate:Date = new Date();
    departure_date:Date;
    return_date:Date;
    showReturnTimePicker:boolean;
    showDepartureTimePicker:boolean;
    room:number=1;

imageUrl=function(url){
  
  return "http://"+(url.split('{',2)[0]+url.split('{',2)[1]+'rmt.jpg').replace(':', ''));
}

	constructor(private route: ActivatedRoute, private router: Router,private hotelService1: hotelService) {
     
    hotelService1.getHotels()
      .subscribe(
          data=>this.Hotels=data),
          error=>alert(error),
        ()=>console.log("Date get finished")
    }



  ngOnInit(): void {
    


        this.route.queryParams.subscribe(params => {
            this.destLat = params['lat'];
            this.destLng = params['lng'];
        });
        
    }

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
	
}