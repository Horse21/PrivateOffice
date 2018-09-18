import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ISuportPhones } from "../../dto/i-suport-phones";

@Component({
	selector: 'support',
	templateUrl: './support.component.html',
})

export class SupportComponent {
	title: string = '24/7 support';
	supportPhones: Array<ISuportPhones>;
	supportEmails: Array<any>;

	constructor (private _http: HttpClient) {

		this._http.get<any>('./data_storage/support_emails.json').subscribe(data => {
			this.supportEmails = data;
		});

		this._http.get<any>('./data_storage/support_phones.json').subscribe(data => {
			this.supportPhones = data;
		});
	}
}
