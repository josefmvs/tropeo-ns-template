// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app/app.module';

import { AppOptions } from 'nativescript-angular/platform-common';

let options: AppOptions = {};

// if (module['hot']) {
// 	options.hmrOptions = {
// 		moduleTypeFactory: () => AppModule,
// 		livesyncCallback: (platformReboot) => {
// 			setTimeout(platformReboot, 0);
// 		}
// 	};

// 	// Path to your app module.
// 	// You might have to change it if your module is in a different place.
// 	module['hot'].accept([ './app/app.module' ], () => {
// 		global['hmrRefresh']();
// 	});
// }

platformNativeScriptDynamic().bootstrapModule(AppModule);
