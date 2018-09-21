import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {Dictionary} from "../../types/string-dictionary";
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
		let fields: Dictionary<string> = {};
		fields["Firstname"] = this.travelerFirstNameControl.value;
		fields["Lastname"] = this.travelerLastNameControl.value;
		fields["Destination"] = this.destinationControl.value;
		fields["ArrivalDate"] = this.getDateOrDefault(this.arrivalDate);
		fields["DepartureDate"] = this.getDateOrDefault(this.departureDate);

		this.oldHotelsAuth.auth(fields);
	}

	private getDateOrDefault(date: Date): string {
		return date !== undefined ? date.toJSON() : '';
	}
}
