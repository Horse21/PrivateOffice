import {Injectable} from '@angular/core';
import {HttpClientService} from 'h21-be-ui-kit';
import {ICity} from 'app/dto/i-city';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TripRequestService {

	constructor(private http: HttpClientService) {
	}

	public search(query: string): Observable<ICity[]> {
		return this.http.post<ICity[]>(`${environment.apiUri}City/Search`, query);
	}
}
