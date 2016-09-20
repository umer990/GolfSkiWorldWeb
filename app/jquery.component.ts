import {Component} from 'angular2/core'
import {ElementRef} from 'angular2/core'
import {OnInit} from 'angular2/core'

declare var jQuery:any; 

@Component({
	selector:'my-jquery',
	template:`
	<button>CLick me</button>
	`
	
	
})

export class jQueryComponent{ 
	constructor(private _elRef:ElementRef){
			ngOnInit():any{
					jQuery(this._elRef.nativeElement).find('button').on("click",function(){
						alert("jQuery works")
					})
			}

	}

}
