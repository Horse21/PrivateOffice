import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from '../dialog/upload-dialog.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent  {
	constructor(public dialog: MatDialog) {}

	public openUploadDialog() {
		this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%' });
	}
}
