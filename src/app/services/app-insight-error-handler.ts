import { ErrorHandler } from '@angular/core';

export class AppInsightErrorHandler extends ErrorHandler {
	//	constructor(private injector: Injector) {
	//		super();
	//	}
	
	handleError(error: any): void {
		//		const monitoringService = this.injector.get(AppInsightsService);
		//		monitoringService.trackException(error);
		super.handleError(error);
	}
}
