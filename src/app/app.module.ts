import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PrototypePermissionService} from '../app/services/prototype-permission-service';
import {PrototypeVocabularyService} from '../app/services/prototype-vocabulary-service';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {AppComponent} from './components/app/app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {
	AppSubscriberService,
	VocabularyService,
	OrderService,
	PermissionService,
	H21HeaderModule,
	H21TopToolbarModule,
	H21SidebarNavModule,
	H21TwoMonthCalendarModule,
} from 'h21-be-ui-kit';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {BoardComponent} from './components/board/board.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SupportComponent} from './components/support/support.component';
import {TripRequestComponent} from './components/trip-request/trip-request.component';


const routes: Routes = [
	{path: '', redirectTo: 'board', pathMatch: 'full'},
	{path: 'board', component: BoardComponent},
	{path: 'trip_request', component: TripRequestComponent},
	{path: 'profile', component: ProfileComponent},
	{path: 'support', component: SupportComponent},
	{path: '**', redirectTo: '/'},
];

@NgModule({
		declarations: [
			AppComponent,
			BoardComponent,
			ProfileComponent,
			SupportComponent,
			TripRequestComponent
		],
		imports: [
			BrowserModule,
			RouterModule.forRoot(routes),
			BrowserAnimationsModule,
			AppMaterialModule,
			ReactiveFormsModule,
			FormsModule,
			HttpClientModule,
			MatInputModule,
			MatNativeDateModule,
			H21HeaderModule,
			H21TopToolbarModule,
			H21SidebarNavModule,
			H21TwoMonthCalendarModule,
		],
		providers: [
			{
				provide: PermissionService,
				useClass: PrototypePermissionService
			},
			{
				provide: VocabularyService,
				useClass: PrototypeVocabularyService
			},
			AppSubscriberService,
			OrderService
		],
		bootstrap: [AppComponent],
		entryComponents: []
	}
)
export class AppModule {

}
