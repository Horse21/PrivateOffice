import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {AppComponent} from './components/app/app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {
	AppSubscriberService,
	H21HeaderModule,
	H21SidebarNavModule,
	H21TopToolbarModule,
	H21TwoMonthCalendarModule,
	OrderService,
} from 'h21-be-ui-kit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BoardComponent} from './components/board/board.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SupportComponent} from './components/support/support.component';
import {TripRequestComponent} from './components/trip-request/trip-request.component';
import {CookieModule} from "ngx-cookie";

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
			CookieModule.forRoot()
		],
		providers: [
			AppSubscriberService,
			OrderService
		],
		bootstrap: [AppComponent],
		entryComponents: []
	}
)
export class AppModule {

}
