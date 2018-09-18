import { Component } from "@angular/core";
import {FormControl, Validators} from "@angular/forms";

@Component({
	selector: 'trip-request',
	templateUrl: './trip-request.component.html',
})

export class TripRequestComponent {

	travelerNameControl = new FormControl('', [Validators.required]);
	destinationControl = new FormControl('', [Validators.required]);

	arrivalDate: Date;
	departureDate: Date;

	title = 'Trip request';

	changeArrivalDate($event) {
		this.arrivalDate = $event;
	}

	changeDepartureDate($event) {
		this.departureDate = $event;
	}
}
