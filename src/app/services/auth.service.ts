import {Injectable} from '@angular/core';
import {HttpClientService} from "h21-be-ui-kit";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClientService, private jwt: JwtHelperService) {
	}

	public auth(login: string, password: string): Observable<any> {
		return this.http.post(`${environment.apiUri}Account/Login`, {
			'login': login,
			'password': password
		});
	}

	public isAuthenticated(): boolean {
		// get the token
		const token = this.jwt.tokenGetter();
		const isExpired = this.jwt.isTokenExpired(token);
		// return a boolean reflecting
		// whether or not the token is expired
		return !isExpired;
	}

	public getToken(): string {
		return localStorage.getItem('access_token')
	}
}
