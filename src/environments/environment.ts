// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
	production: false,
	ssoUri: "https://horse21pro.com/api/",
	apiUri: 'http://localhost:5000/api/',
	AppInsightInstrumentationKey: 'f52065f5-44cd-4df6-b4db-a7431f8d9b5a'
};
