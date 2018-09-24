import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Dictionary} from "../types/string-dictionary";
import {HttpClientService} from "h21-be-ui-kit";
import {Fields} from "../constants/fields";

@Injectable({
	providedIn: 'root'
})
export class OldHotelsAuthService {

	constructor(private http: HttpClientService) {
	}

	public auth(fields: Dictionary<string>) {
		let form = new URLSearchParams();
		form.set("userName", localStorage.getItem(Fields.Login));
		form.set("password", localStorage.getItem(Fields.Password));

		for (let field in fields) {
			form.append(field, fields[field]);
		}

		this.http.post<string>(`${environment.apiUri}OldHotels/Auth`, form.toString())
			.subscribe(x => window.open(x, '_self'));
	}
}
