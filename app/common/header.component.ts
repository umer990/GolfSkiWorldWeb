import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
//import {SimplePageScroll} from 'ng2-simple-page-scroll';

@Component({
	selector:'header',
	templateUrl:'app/common/header.component.html',
//	directives:[SimplePageScroll]
	
})

export class HeaderComponent{
	constructor() {
      //  SimplePageScrollConfig.defaultScrollOffset = 50;
    }
 
}