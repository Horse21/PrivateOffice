import { Component } from "@angular/core"
import {IProfileData} from "../../dto/i-profile-data";

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
})

export class ProfileComponent {
	profileData: IProfileData;

	constructor() {
		this.testInit();
	}

	testInit() {
		this.profileData = <IProfileData> {
			registrationDate: null,
			updateDate: null,
			identityUserId: '6893922f-0ee8-4b1c-b7b3',
			status: 'Active',
			pictureUrl: 'https://horse21pro.com/Content/Images/Logo/9637b_13987_1173_34li5xo.png',
			firstName: 'John',
			lastName: 'Doe',
			middleName: '',
			companyName: 'Travel Company',
			function: 'Manager',
			email: 'aaa@bbb.ccc',
			password: 'Abcd1',
			phone: '+9876543210'
		};
	}
}
