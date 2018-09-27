import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UploadDialogComponent} from '../dialog/upload-dialog.component';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html'
})
export class UploadComponent {
	@Input() url: string;

	@Input() buttonName: string;

	constructor(public dialog: MatDialog) {
	}

	public openUploadDialog() {
		this.dialog.open(UploadDialogComponent, {
			width: '50%',
			height: '50%',
			panelClass: 'c-upload-dialog',
			data: { url: this.url }
		});
	}
}
