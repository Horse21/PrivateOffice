export interface IEnvironment {
	production: boolean;
	ssoUri: string;
	apiUri: string;
	
	debounceTime: number;
	AppInsightInstrumentationKey: string;
}
