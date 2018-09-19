import {
	Component,
	AfterContentChecked,
	ViewChild,
	TemplateRef
} from '@angular/core';
import {MatIconRegistry, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {Router} from "@angular/router";
import {trigger, state, transition, animate, style} from "@angular/animations";
import {ISidebarNavTab} from 'h21-be-ui-kit';
import {FormControl, Validators} from "@angular/forms";

const SIDEBAR_NAV_TABS: Array<ISidebarNavTab> = [
	{name: 'board', label: 'Board', icon: 'apps', type: 'link', url: 'board', disabled: false},
	{name: 'trip_request', label: 'Trip request', icon: 'find_in_page', type: 'link', url: 'trip_request', disabled: false },
	{name: 'profile', label: 'Profile', icon: 'person', type: 'link', url: 'profile', disabled: false},
	{name: 'support', label: 'Support', icon: 'perm_phone_msg', type: 'link', url: 'support', disabled: false},
];

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	viewProviders: [MatIconRegistry],
	animations: [
		trigger('splashScreenVisibility', [
			state('void', style({left: '-100%'})),
			state('enter', style({left: '0'})),
			state('leave', style({left: '-100%'})),
			transition('* => *', animate('400ms')),
		]),
		trigger('loginFormVisibility', [
			state('void', style({bottom: '-100%'})),
			state('enter', style({bottom: '0'})),
			state('leave', style({bottom: '-100%'})),
			transition('* => *', animate('400ms')),
		]),
		trigger('mainContentVisibility', [
			state('void', style({opacity: '0'})),
			state('enter', style({opacity: '1'})),
			state('leave', style({opacity: '0'})),
			transition('* => *', animate('400ms')),
		])
	]
})

export class AppComponent implements AfterContentChecked {

	animationState: 'void' | 'enter' | 'leave' = 'enter';

	loginControl = new FormControl('', [Validators.required]);
	passwordControl = new FormControl('', [Validators.required]);

	title: string = 'Private Office 1.0';
	userName: string = '';
	userPicture: string = '';
	sidebarNavTabs: Array<ISidebarNavTab> = SIDEBAR_NAV_TABS;
	sidebarNavDisabled: boolean = false;
	sidebarNavActiveTab: string = '';
	isLogin: boolean =  false;
	loginFormVisibility: boolean = true;
	contentVisibility: boolean = false;
	passwordVisibility: 'text' | 'password' = 'password';
	private snackBarRef: MatSnackBarRef<any>;
	@ViewChild('loginErrorTpl') snackBarTpl: TemplateRef<any>;


	constructor(private _router: Router, private _snackBar: MatSnackBar) {
		this.userName = 'John Doe';
		this.userPicture = 'https://horse21pro.com/Content/Images/Logo/9637b_13987_1173_34li5xo.png';

		this.isLogin = false;
		this.loginFormVisibility = !this.isLogin;
		this.contentVisibility = this.isLogin;
	}

	ngAfterContentChecked() {
		if (this.sidebarNavTabs) {
			this.sidebarNavActiveTab = this.getSidebarNavTabNameByRoute(this._router.url);
		}
	}

	getSidebarNavTabNameByRoute(route: string): string {
		let index = this.sidebarNavTabs.findIndex((item) => { return route.indexOf(item.url) >= 0 });
		if (index >= 0) {
			return this.sidebarNavTabs[index].name;
		}
		return '';
	}

	sidebarNavAction(tab: ISidebarNavTab): void {
		this.sidebarNavActiveTab = tab.name;
	}

	togglePasswordVisibility(): void {
		this.passwordVisibility = this.passwordVisibility == 'text'
			? 'password'
			: 'text';
	}

	login(): void {
		if (this.loginControl.value == '1' && this.passwordControl.value == '1') {
			this.isLogin = true;
			this.animationState = 'leave';
			this.closeSnackBar();
		} else {
			this.snackBarRef = this._snackBar.openFromTemplate(this.snackBarTpl, {
				duration: 600000,
				horizontalPosition: 'right',
				verticalPosition: 'bottom',
				panelClass: 'po_login-error',
			});
		}
	}

	closeSnackBar() {
		if (this.snackBarRef) {
			this.snackBarRef.dismiss();
		}
	}

	onAnimationStart() {
		this.contentVisibility = this.isLogin;
	}

	onAnimationDone() {
		this.loginFormVisibility = !this.isLogin;
	}
}
