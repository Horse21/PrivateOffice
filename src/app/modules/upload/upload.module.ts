import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploadDialogComponent} from './dialog/upload-dialog.component';
import {UploadService} from './services/upload.service';
import {UploadComponent} from './component/upload.component';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatDialogModule,
		MatListModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatProgressBarModule,
		MatIconModule],
	declarations: [UploadComponent, UploadDialogComponent],
	exports: [UploadComponent],
	entryComponents: [UploadDialogComponent],
	providers: [UploadService]
})
export class UploadModule {

}
