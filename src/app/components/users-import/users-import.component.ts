import {Component} from '@angular/core';
import {environment} from 'environments/environment';

@Component({
	selector: 'app-users-import',
	templateUrl: './users-import.component.html',
	styleUrls: ['./users-import.component.css']
})
export class UsersImportComponent {
	get url(): string {
		return `${environment.apiUri}Import/Upload`;
	}
}
