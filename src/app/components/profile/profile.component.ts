import {Component, Inject} from "@angular/core"
import {IProfileData} from "../../dto/i-profile-data";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from "@angular/material";
import {AuthService} from "../../services/auth.service";

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
})

export class ProfileComponent {
	profileData: IProfileData;
	avatarPreloaderVisibility: boolean = false;

	constructor(@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
				private _dateAdapter: DateAdapter<Date>, private auth: AuthService) {
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
		const userDate = this.auth.getUserData();
		this.profileData = <IProfileData> {
			registrationDate: this._dateAdapter.today(),
			updateDate: this._dateAdapter.today(),
			identityUserId: '6893922f-0ee8-4b1c-b7b3',
			status: 'Active',
			pictureUrl: userDate.imageLink || '',
			firstName: userDate.firstName || '',
			lastName: userDate.lastName || '',
			middleName: userDate.middleName || '',
			companyName: userDate.companyName || '',
			function: userDate.function || '',
			email: userDate.email || '',
			phone: userDate.phone || ''
		};
	}
}
