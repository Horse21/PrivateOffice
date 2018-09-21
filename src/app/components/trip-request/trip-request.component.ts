import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

	constructor(private http: HttpClient, private _cookieService: CookieService) {

	}

	changeArrivalDate($event) {
		this.arrivalDate = $event;
	}

	changeDepartureDate($event) {
		this.departureDate = $event;
	}

	submit() {
		let form = new HttpParams()
			.set("userName", this.getCookie("userName"))
			.set("password", this.getCookie("password"))
			.set("Firstname", this.travelerFirstNameControl.value)
			.set("Lastname", this.travelerLastNameControl.value)
			.set("Destination", this.destinationControl.value)
			.set("ArrivalDate", this.arrivalDate.toJSON())
			.set("DepartureDate", this.departureDate.toJSON());

		const headers = new HttpHeaders()
			.append("Content-Type", "application/x-www-form-urlencoded")
			.append('Accept', 'application/json')
			.append('Host', 'https://horse21pro.com');

		this.http.post<string>(`${environment.ssoUri}OutSideAuth`, form.toString(), {
			headers,
			observe: 'response'
		}).subscribe(x => window.location.href = `https://horse21pro.com/Home/Login?authkey=${x}`)
	}

	private getCookie(key: string) {
		return this._cookieService.get(key);
	}
}
