import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {StringDictionary} from "../types/string-dictionary";

@Injectable({
	providedIn: 'root'
})
export class OldHotelsAuthService {

	constructor(private http: HttpClient, private _cookieService: CookieService) {
	}

	public auth(fields: StringDictionary) {
		let form = new URLSearchParams();
		form.set("userName", this.getCookie("userName"));
		form.set("password", this.getCookie("password"));
		for (let field in fields) {
			form.append(field, fields[field]);
		}
		const headers = new HttpHeaders()
			.append('Content-Type', 'application/x-www-form-urlencoded');
		//.append('Access-Control-Allow-Origin', '*');

		this.http.post<string>(`${environment.ssoUri}OutSideAuth`, form.toString(), {
			headers,
			observe: 'response'
		}).subscribe(x => window.open(`https://horse21pro.com/Home/Login?authkey=${x}`, '_self'));
	}

	private getCookie(key: string) {
		return this._cookieService.get(key);
	}
}
