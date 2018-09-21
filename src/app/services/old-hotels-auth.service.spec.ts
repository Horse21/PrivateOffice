import {inject, TestBed} from '@angular/core/testing';

import {OldHotelsAuthService} from './old-hotels-auth.service';

describe('OldHotelsAuthService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OldHotelsAuthService]
		});
	});

	it('should be created', inject([OldHotelsAuthService], (service: OldHotelsAuthService) => {
		expect(service).toBeTruthy();
	}));
});
