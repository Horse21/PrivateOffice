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
	OrderService
} from 'h21-be-ui-kit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BoardComponent} from './components/board/board.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SupportComponent} from './components/support/support.component';
import {TripRequestComponent} from './components/trip-request/trip-request.component';
import {CookieModule} from 'ngx-cookie';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {TokenInterceptor} from './interceptors/token-interceptor';
import {UsersImportComponent} from './components/users-import/users-import.component';
import {AdminGuardGuard} from './guards/admin-guard.guard';
import {Fields} from './constants/fields';
import {UploadModule} from './modules/upload/upload.module';
import {AppInsightsService, ApplicationInsightsModule} from '@markpieszak/ng-application-insights';
import {AppInsightInterceptor} from './interceptors/app-insight-interceptor';
import {CitiesImportComponent} from './components/cities-import/cities-import.component';
import {ImportComponent} from './components/import/import.component';

const routes: Routes = [
	{ path: '', redirectTo: 'board', pathMatch: 'full' },
	{ path: 'board', component: BoardComponent },
	{ path: 'trip_request', component: TripRequestComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'support', component: SupportComponent },
	{
		path: 'import', component: ImportComponent, canActivate: [AdminGuardGuard]
	},
	{
		path: 'import/users', component: UsersImportComponent, canActivate: [AdminGuardGuard]
	},
	{
		path: 'import/cities', component: CitiesImportComponent, canActivate: [AdminGuardGuard]
	},
	{ path: '**', redirectTo: '/' }
];

export function tokenGetter() {
	return localStorage.getItem(Fields.Token);
}

@NgModule({
		declarations: [
			AppComponent,
			BoardComponent,
			ProfileComponent,
			SupportComponent,
			TripRequestComponent,
			UsersImportComponent,
			CitiesImportComponent,
			ImportComponent
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
			CookieModule.forRoot(),
			UploadModule,
			ApplicationInsightsModule.forRoot({
				instrumentationKeySetlater: true // <--
			}),
			JwtModule.forRoot({
				config: {
					tokenGetter: () => localStorage.getItem(Fields.Token),
					whitelistedDomains: [environment.apiUri],
					throwNoTokenError: false,
					skipWhenExpired: true,
					headerName: 'Authorization',
					authScheme: 'Bearer'
				}
			})
		],
		providers: [
			AppSubscriberService,
			OrderService,
			{
				provide: HTTP_INTERCEPTORS,
				useClass: TokenInterceptor,
				multi: true
			},
			{
				provide: HTTP_INTERCEPTORS,
				useClass: AppInsightInterceptor,
				multi: true
			}, AppInsightsService
		],
	bootstrap: [AppComponent],
	entryComponents: []
	}
)
export class AppModule {
	constructor(private appInsightsService: AppInsightsService) {
		appInsightsService.config = {
			instrumentationKey: environment.AppInsightInstrumentationKey // <-- set it later sometime
		};
		// then make sure to initialize and start-up app insights
		appInsightsService.init();
	}
}
