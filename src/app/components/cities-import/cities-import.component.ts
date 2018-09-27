import {Component} from '@angular/core';
import {environment} from 'environments/environment';

@Component({
	selector: 'app-cities-import',
	templateUrl: './cities-import.component.html',
	styleUrls: ['./cities-import.component.css']
})
export class CitiesImportComponent {
	get url(): string {
		return `${environment.apiUri}City/Upload`;
	}
}
