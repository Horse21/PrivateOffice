import {Component, Inject} from "@angular/core"
import {IProfileData} from "../../dto/i-profile-data";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MatDateFormats
} from "@angular/material";

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
})

export class ProfileComponent {
	profileData: IProfileData;
	avatarPreloaderVisibility: boolean = false;

	constructor(@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
				private _dateAdapter: DateAdapter<Date>) {
		this.testInit();
		if (this.profileData.pictureUrl) {
			this.avatarPreloaderVisibility = true;
		}
	}

	hideAvatarPreloader(): void {
		setTimeout(() => {
			this.avatarPreloaderVisibility = false;
		}, 1000);
	}

	testInit() {
		this.profileData = <IProfileData> {
			registrationDate: this._dateAdapter.today(),
			updateDate: this._dateAdapter.today(),
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
