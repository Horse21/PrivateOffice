import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {environment} from "../../environments/environment";
import {Dictionary} from "../types/string-dictionary";
import {HttpClientService} from "h21-be-ui-kit";

@Injectable({
	providedIn: 'root'
})
export class OldHotelsAuthService {

	constructor(private http: HttpClientService, private _cookieService: CookieService) {
	}

	public auth(fields: Dictionary<string>) {
		let form = new URLSearchParams();
		form.set("userName", this.getCookie("userName"));
		form.set("password", this.getCookie("password"));

		for (let field in fields) {
			form.append(field, fields[field]);
		}

		this.http.post<string>(`${environment.apiUri}OldHotels/Auth`, form.toString())
			.subscribe(x => window.open(x, '_self'));
	}

	private getCookie(key: string) {
		return this._cookieService.get(key);
	}
}
