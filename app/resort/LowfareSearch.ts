    export interface Origin {
        airport: string;
        terminal: string;
    }

    export interface Destination {
        airport: string;
        terminal: string;
    }

    export interface BookingInfo {
        travel_class: string;
        booking_code: string;
        seats_remaining: number;
    }

    export interface Flight {
        departs_at: string;
        arrives_at: string;
        origin: Origin;
        destination: Destination;
        marketing_airline: string;
        operating_airline: string;
        flight_number: string;
        aircraft: string;
        booking_info: BookingInfo;
    }

    export interface Outbound {
        flights: Flight[];
    }

    export interface Inbound {
        flights: Flight[];
    }

    export interface Itinerary {
        outbound: Outbound;
        inbound: Inbound;
    }

    export interface PricePerAdult {
        total_fare: string;
        tax: string;
    }
    export interface PricePerChild {
        total_fare: string;
        tax: string;
    }
    export interface PricePerInfant {
        total_fare: string;
        tax: string;
    }

    export interface Restrictions {
        refundable: boolean;
        change_penalties: boolean;
    }

    export interface Fare {
        total_price: string;
        price_per_adult: PricePerAdult;
        price_per_child: PricePerChild;
        price_per_infant: PricePerInfant;
        restrictions: Restrictions;
    }

    export interface Result {
        itineraries: Itinerary[];
        fare: Fare;
    }

    export interface LowFareSearch {
        currency: string;
        results: Result[];
    }

    export class ItineraryWithPrice{
         outFlights: Flight[];
         out_departs_at: string;
        out_departs_time:string;
        out_arrives_at: string;
        out_arrives_time:string
        out_marketing_airline: string;
        out_flight_number: string;
        out_aircraft: string;
        out_origin_airport: string;
        out_origin_terminal: string;
        out_destination_airport: string;
        out_destination_terminal: string;
        out_stops:number;
        out_duration:string;
        include_in_bound:boolean=false;
        inFlights: Flight[];
        in_departs_at: string;
        in_departs_time:string;
        in_arrives_at: string;
        in_arrives_time:string
        in_marketing_airline: string;
        in_flight_number: string;
        in_aircraft: string;
        in_origin_airport: string;
        in_origin_terminal: string;
        in_destination_airport: string;
        in_destination_terminal: string;
        in_stops:number;
        in_duration:string;
         
         fare: Fare;
         total_price:string;
        
        showDetails:boolean=false;


   public   spilt(value:string,index:number):string {
        //console.log(value);
    let splits:string[] = value.split('T');
    return splits[index];
  }


   public   spiltTime(value:string,index:number):number {
        //console.log(value);
    let splits:string[] = value.split(':');
    return Number(splits[index]);
  }


getHoursBetween( date1:Date, date2:Date ):string {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  //take out milliseconds
  difference_ms = difference_ms/1000;
  
  difference_ms = difference_ms/60; 
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms/60; 
  var hours = Math.floor(difference_ms % 24);  
  var days = Math.floor(difference_ms/24);
let result:string="";
  if(days >0){
      result+= days + "d ";
  }
  if(hours >0){
      result+= hours + "h ";
  }
  if(minutes >0){
      result+= minutes + "m";
  }

  return result;
  
}

    }