import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {HttpClientService} from "h21-be-ui-kit";
import {environment} from "../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";

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

	constructor(private http: HttpClientService, private _cookieService: CookieService) {

	}

	changeArrivalDate($event) {
		this.arrivalDate = $event;
	}

	changeDepartureDate($event) {
		this.departureDate = $event;
	}

	submit() {
		let form = new FormData();
		form.append("userName", this.getCookie("userName"));
		form.append("password", this.getCookie("password"));

		form.append("Firstname", this.travelerFirstNameControl.value);
		form.append("Lastname", this.travelerLastNameControl.value);
		form.append("Destination", this.destinationControl.value);
		form.append("ArrivalDate", this.arrivalDate.toJSON());
		form.append("DepartureDate", this.departureDate.toJSON());

		let headers = new HttpHeaders();
		headers.set("Content-Type", "application/x-www-form-urlencoded");
		headers.set("Accept", "application/json");

		this.http.post<string>(`${environment.ssoUri}OutSideAuth`, form, {
			responseType: 'json',
			headers: headers
		}).subscribe(x => window.location.href = `https://horse21pro.com/Home/Login?authkey=${x}`)
	}

	private getCookie(key: string) {
		return this._cookieService.get(key);
	}
}
