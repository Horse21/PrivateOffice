import {Injectable} from '@angular/core';
import {HttpClientService} from "h21-be-ui-kit";
import {CookieService} from "ngx-cookie";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClientService, private _cookieService: CookieService) {
	}

	public auth(login: string, password: string): void {
		this.http.post(`${environment.apiUri}Account/Login`, {
			'email': login,
			'password': password
		}).subscribe(x => console.log(x))
	}
}
