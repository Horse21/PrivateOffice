import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesImportComponent } from './cities-import.component';

describe('CitiesImportComponent', () => {
	let component: CitiesImportComponent;
	let fixture: ComponentFixture<CitiesImportComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CitiesImportComponent]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(CitiesImportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
