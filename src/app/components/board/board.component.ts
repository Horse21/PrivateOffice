import { Component } from "@angular/core"
import { Router } from "@angular/router";

@Component({
	selector: 'board',
	templateUrl: './board.component.html',
})

export class BoardComponent {
	constructor(private _router: Router,) {

	}
}
