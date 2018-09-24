import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FileUploaderService} from "../../services/file-uploader.service";

@Component({
	selector: 'app-users-import',
	templateUrl: './users-import.component.html',
	styleUrls: ['./users-import.component.css']
})
export class UsersImportComponent implements OnInit {
	get action(): string {
		return `${environment.apiUri}Import/AddFile`
	}
	constructor(private uploader: FileUploaderService) {
	}

	ngOnInit() {
	}

	fileChanged(e: Event) {
		this.uploader
			.upload(`${environment.apiUri}Import/AddFile`, e)
			.subscribe((x) => {
			});
	}
}
