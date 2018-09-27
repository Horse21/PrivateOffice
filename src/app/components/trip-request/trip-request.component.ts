import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Dictionary } from '../../types/string-dictionary';
import { OldHotelsAuthService } from '../../services/old-hotels-auth.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { TripRequestService } from 'app/services/trip-request.service';
import { ICity } from 'app/dto/i-city';
import { environment } from 'environments/environment';

@Component({
	selector: 'trip-request',
	templateUrl: './trip-request.component.html'
})

export class TripRequestComponent implements OnInit {
	travelerFirstNameControl = new FormControl('', [Validators.required]);
	
	travelerLastNameControl = new FormControl('', [Validators.required]);
	
	destinationControl = new FormControl('', [Validators.required]);
	
	destinationId: number = -1;
	
	arrivalDate: Date;
	
	departureDate: Date;
	
	filteredDestinationList: Observable<ICity[]>;
	
	title = 'Trip request';
	
	constructor(private oldHotelsAuth: OldHotelsAuthService, private service: TripRequestService) {
	
	}
	
	ngOnInit() {
		this.destinationControl.valueChanges.pipe(
			debounceTime(environment.debounceTime),
			startWith(''),
			map(x => this._filter(x))
		).subscribe(x => this.filteredDestinationList = x);
	}
	
	changeArrivalDate($event) {
		this.arrivalDate = $event;
	}
	
	changeDepartureDate($event) {
		this.departureDate = $event;
	}
	
	submit() {
		let fields: Dictionary<string> = {};
		fields['Firstname'] = this.travelerFirstNameControl.value;
		fields['Lastname'] = this.travelerLastNameControl.value;
		fields['Destination'] = this.destinationControl.value;
		fields['ArrivalDate'] = this.getDateOrDefault(this.arrivalDate);
		fields['DepartureDate'] = this.getDateOrDefault(this.departureDate);
		
		this.oldHotelsAuth.auth(fields);
	}
	
	private getDateOrDefault(date: Date): string {
		return date !== undefined ? date.toJSON() : '';
	}
	
	private _filter(value: string): Observable<ICity[]> {
		this.clearDestination();
		
		if (value.length > 2) {
			const filterValue = value.toString().toLowerCase();
			return this.service.search(filterValue);
		}
		
		return null;
	}
	
	selectDestination(id: number): void {
		this.destinationId = id;
	}
	
	clearDestination(): void {
		this.destinationId = 0;
	}
}
