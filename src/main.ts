console.log("I am entry point of SPA");

import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';

// platformBrowserDynamic().bootstrapModule(AppModule);
bootstrapApplication(AppModule)
