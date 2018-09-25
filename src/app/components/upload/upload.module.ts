import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogComponent} from "./dialog/dialog.component";
import {UploadService} from "../../services/upload.service";
import {UploadComponent} from "./component/upload.component";

@NgModule({
	imports: [CommonModule, MatButtonModule, MatDialogModule, MatListModule, HttpClientModule, BrowserAnimationsModule, MatProgressBarModule],
	declarations: [UploadComponent, DialogComponent],
	exports: [UploadComponent],
	entryComponents: [DialogComponent], // Add the DialogComponent as entry component
	providers: [UploadService]
})
export class UploadModule { }
