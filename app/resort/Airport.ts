

    export interface Location {
        latitude: number;
        longitude: number;
    }

    export interface Airport {
        airport: string;
        airport_name: string;
        city: string;
        city_name: string;
        distance: number;
        location: Location;
        aircraft_movements: number;
        timezone: string;
    }


      export class AirportInfo {
        value: string;
        label: string;
    }

