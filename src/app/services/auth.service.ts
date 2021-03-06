import { Injectable } from '@angular/core';
import { HttpClientService } from 'h21-be-ui-kit';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserData } from '../dto/i-user-data';
import { Fields } from '../constants/fields';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClientService, private jwt: JwtHelperService) {
	}

	public auth(login: string, password: string): Observable<any> {
		return this.http.post(`${environment.apiUri}Account/LoginAsync`, {
			'login': login,
			'password': password
		});
	}

	public logout(): Observable<any> {
		return this.http.post(`${environment.apiUri}Account/LogoutAsync`, {});
	}

	public isAuthenticated(): boolean {
		// get the token
		const token = this.getToken();
		const isExpired = this.jwt.isTokenExpired(token);
		// return a boolean reflecting
		// whether or not the token is expired
		return !isExpired && token !== null;
	}

	public getToken(): string {
		return localStorage.getItem(Fields.Token) || null;
	}

	public getUserData(): IUserData {
		return this.jwt.decodeToken(this.getToken());
	}
}
