import {Component} from 'angular2/core';
import {LandingComponent} from './landing.component'
import {CoursesComponent} from './courses.component'
import {AuthorsComponent} from './author.component'
import {jQueryComponent} from './jquerys.component'
import {MoviesListComponent} from './moviesList.component'
import {PageNotFoundComponent} from './pagenotfound.component'

//import { AppModule } from './app.module';

//platformBrowserDynamic().bootstrapModule(AppModule);

@Component({
    selector: 'my-app',
    template: `
    		              
    			<landingPage></landingPage>
    			
    			
    			`,
    directives:[LandingComponent,CoursesComponent,AuthorsComponent,jQueryComponent]
})

export class AppComponent {
AppName="GolfSki World";
}