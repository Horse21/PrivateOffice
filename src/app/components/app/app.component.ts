import {AfterContentChecked, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSnackBar, MatSnackBarRef} from '@angular/material';
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ISidebarNavTab, IUserCardData} from 'h21-be-ui-kit';
import {FormControl, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie";
import {AuthService} from "../../services/auth.service";
import {IUserData} from "../../dto/i-user-data";
import {Fields} from "../../constants/fields";

const SIDEBAR_NAV_TABS: Array<ISidebarNavTab> = [
	{name: 'board', label: 'Board', icon: 'apps', type: 'link', url: 'board', disabled: false},
	{
		name: 'trip_request',
		label: 'Trip request',
		icon: 'find_in_page',
		type: 'link',
		url: 'trip_request',
		disabled: false
	},
	{name: 'profile', label: 'Profile', icon: 'person', type: 'link', url: 'profile', disabled: false},
	{name: 'support', label: 'Support', icon: 'perm_phone_msg', type: 'link', url: 'support', disabled: false},
];

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
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

export class AppComponent implements AfterContentChecked, OnInit {

	animationState: 'void' | 'enter' | 'leave' = 'enter';

	loginControl = new FormControl('', [Validators.required]);
	passwordControl = new FormControl('', [Validators.required]);

	titleText: string = 'Profile';
	userData: IUserData;

	get userName(): string {
		if (!this.isLogin) {
			return 'User Name';
		}

		return `${this.userData.firstName || ''} ${this.userData.lastName || ''}`
	};

	get userPicture(): string {
		if (!this.isLogin) {
			return '';
		}

		return this.userData.imageLink || '';
	};

	get userEmail(): string {
		if (!this.isLogin) {
			return '';
		}

		return this.userData.email || '';
	}

	sidebarNavTabs: Array<ISidebarNavTab> = SIDEBAR_NAV_TABS;
	sidebarNavDisabled: boolean = false;
	sidebarNavActiveTab: string = '';
	isLogin: boolean = false;
	loginFormVisibility: boolean = true;
	contentVisibility: boolean = false;
	passwordVisibility: 'text' | 'password' = 'password';
	userCardData: IUserCardData;
	private snackBarRef: MatSnackBarRef<any>;
	@ViewChild('loginErrorTpl') snackBarTpl: TemplateRef<any>;


	constructor(private _router: Router, private _snackBar: MatSnackBar, private _cookieService: CookieService, private _auth: AuthService) {
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
		let index = this.sidebarNavTabs.findIndex((item) => {
			return route.indexOf(item.url) >= 0
		});
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
		this._auth.auth(this.loginControl.value, this.passwordControl.value)
			.subscribe(
				x => {
					localStorage.setItem(Fields.Login, this.loginControl.value);
					localStorage.setItem(Fields.Password, this.passwordControl.value);
					localStorage.setItem(Fields.Token, x);
					this.init();
					this.animationState = 'leave';
					this.closeSnackBar();
				},
				err => console.log(err)
			);
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

	ngOnInit(): void {
		this.init();
	}

	logout(): void {
		this._auth.logout()
			.subscribe(x => {
				localStorage.removeItem(Fields.Token);
				localStorage.removeItem(Fields.Password);
				localStorage.removeItem(Fields.Login);
				this.init();
				this.animationState = 'enter';
			}, error => console.log(error));
	}

	init(): void {
		this.isLogin = this._auth.isAuthenticated();
		this.onAnimationStart();
		this.onAnimationDone();
		this.userData = this._auth.getUserData();
		this.userCardData = {
			user: {
				name: this.userName,
				email: this.userEmail,
				avatarUrl: this.userPicture,
			},
			actions: [
				{
					name: 	'profile',
					label:	'My profile',
					icon:	'person',
					route:	'profile',
					type:	'link'
				}
			]
		};
	}
}
