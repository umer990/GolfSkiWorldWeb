import {Component} from 'angular2/core'
import {CoursesService} from './courses.service'

@Component({
	selector:'courses',
	template:`
			<h2>Course</h2>
			{{title}}
			<ul>
			<li *ngFor="#course of courses">
			{{course}}

			</li>
			</ul>
			`,
	providers:[CoursesService]
	
})

export class CoursesComponent{ 
title="Its title course ";
courses;

constructor(courseService: CoursesService){
	this.courses=courseService.getCourses();
}
}
