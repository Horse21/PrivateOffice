import {Component, EventEmitter} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {Router} from "@angular/router";
import {trigger, state, transition, animate, style} from "@angular/animations";
import {ISidebarNavTab} from 'h21-be-ui-kit';

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
			transition('* => *', animate('120ms')),
		]),
		trigger('loginFormVisibility', [
			state('void', style({bottom: '-100%'})),
			state('enter', style({bottom: '0'})),
			state('leave', style({bottom: '-100%'})),
			transition('* => *', animate('120ms')),
		])
	]
})

export class AppComponent {

	animationState: 'void' | 'enter' | 'leave' = 'enter';
	animationStateChanged = new EventEmitter<AnimationEvent>();

	title: string = 'Private Office 1.0';
	userName: string = '';
	userPicture: string = '';
	sidebarNavTabs: Array<ISidebarNavTab> = SIDEBAR_NAV_TABS;
	sidebarNavDisabled: boolean = false;
	sidebarNavActiveTab: string = '';
	isLogin: boolean =  true;

	constructor(private _router: Router) {
		this.userName = 'John Doe';
		this.userPicture = 'https://horse21pro.com/Content/Images/Logo/9637b_13987_1173_34li5xo.png';
	}

	sidebarNavAction(tab: ISidebarNavTab): void {
		this.sidebarNavActiveTab = tab.name;
	}

	isRoute(route: string) {
		return this._router.url.indexOf(route) >= 0;
	}

	login() {
		this.isLogin = true;
	}
}
