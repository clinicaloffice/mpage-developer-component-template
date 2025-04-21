import {
  ApplicationConfig, ErrorHandler,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import {ConfigService, ErrorHandlerService} from '@clinicaloffice/mpage-developer';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideAnimationsAsync('noop'),
    provideAppInitializer(() => {
      // Load the config.json file (if not using, remove the next two lines or the entire provideAppInitializer section.
//      const configService = inject(ConfigService);
//      return configService.loadConfig();
    }),
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ]
};
