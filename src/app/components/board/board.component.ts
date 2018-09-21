import {Component} from "@angular/core"
import {OldHotelsAuthService} from "../../services/old-hotels-auth.service";

@Component({
	selector: 'board',
	templateUrl: './board.component.html',
})

export class BoardComponent {
	constructor(private oldHotelsAuth: OldHotelsAuthService) {

	}

	redirectToHotels() {
		this.oldHotelsAuth.auth({});
	}
}
