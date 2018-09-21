import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {StringDictionary} from "../../types/string-dictionary";
import {OldHotelsAuthService} from "../../services/old-hotels-auth.service";

@Component({
	selector: 'trip-request',
	templateUrl: './trip-request.component.html',
})

export class TripRequestComponent {
	travelerFirstNameControl = new FormControl('', [Validators.required]);
	travelerLastNameControl = new FormControl('', [Validators.required]);
	destinationControl = new FormControl('', [Validators.required]);
	arrivalDate: Date;
	departureDate: Date;

	title = 'Trip request';

	constructor(private oldHotelsAuth: OldHotelsAuthService) {

	}

	changeArrivalDate($event) {
		this.arrivalDate = $event;
	}

	changeDepartureDate($event) {
		this.departureDate = $event;
	}

	submit() {
		let fields: StringDictionary = {};
		fields["Firstname"] = this.travelerFirstNameControl.value;
		fields["Lastname"] = this.travelerLastNameControl.value;
		fields["Destination"] = this.destinationControl.value;
		fields["ArrivalDate"] = this.arrivalDate.toJSON();
		fields["DepartureDate"] = this.departureDate.toJSON();

		this.oldHotelsAuth.auth(fields);
	}
}
