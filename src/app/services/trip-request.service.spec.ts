import {inject, TestBed} from '@angular/core/testing';

import {TripRequestService} from './trip-request.service';

describe('TripRequestService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TripRequestService]
		});
	});

	it('should be created', inject([TripRequestService], (service: TripRequestService) => {
		expect(service).toBeTruthy();
	}));
});

