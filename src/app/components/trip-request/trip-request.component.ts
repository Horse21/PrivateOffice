import {Component, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {Dictionary} from "../../types/string-dictionary";
import {OldHotelsAuthService} from "../../services/old-hotels-auth.service";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
	selector: 'trip-request',
	templateUrl: './trip-request.component.html',
})

export class TripRequestComponent implements  OnInit{
	travelerFirstNameControl = new FormControl('', [Validators.required]);
	travelerLastNameControl = new FormControl('', [Validators.required]);
	destinationControl = new FormControl('', [Validators.required]);
	destinationId: number = -1;
	arrivalDate: Date;
	departureDate: Date;

	destinationList: any[] = [ // todo: specify object type, remove test data
		{id: 1, name: 'Moscow'},
		{id: 2, name: 'London'},
		{id: 3, name: 'London'},
		{id: 4, name: 'Berlin'},
		{id: 5, name: 'Paris'},
		{id: 6, name: 'Rome'},
		{id: 7, name: 'New York'}
	];
	filteredDestinationList: Observable<any[]>; // todo: specify object type

	title = 'Trip request';

	constructor(private oldHotelsAuth: OldHotelsAuthService) {

	}

	ngOnInit() {
		this.filteredDestinationList = this.destinationControl.valueChanges.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}

	changeArrivalDate($event) {
		this.arrivalDate = $event;
	}

	changeDepartureDate($event) {
		this.departureDate = $event;
	}

	submit() {
		let fields: Dictionary<string> = {};
		fields["Firstname"] = this.travelerFirstNameControl.value;
		fields["Lastname"] = this.travelerLastNameControl.value;
		fields["Destination"] = this.destinationControl.value;
		fields["ArrivalDate"] = this.getDateOrDefault(this.arrivalDate);
		fields["DepartureDate"] = this.getDateOrDefault(this.departureDate);

		this.oldHotelsAuth.auth(fields);
	}

	private getDateOrDefault(date: Date): string {
		return date !== undefined ? date.toJSON() : '';
	}

	private _filter(value: string): any[] { // todo: specify object type
		this.clearDestination();
		if (value.length > 2) {
			const filterValue = value.toString().toLowerCase();

			// line contains ...
			return this.destinationList.filter(item => item.name.toLowerCase().includes(filterValue));
			// line starts with ...
			//return this.destinationList.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
			// todo: remove unnecessary
		}
		return <any>[];
	}

	selectDestination(id: number): void {
		this.destinationId = id;
	}

	clearDestination(): void {
		this.destinationId = 0;
	}
}
