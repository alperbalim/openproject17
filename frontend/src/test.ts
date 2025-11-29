// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// Require the reflect ES7 polyfill for JIT
import 'zone.js'; // Included with Angular CLI.
import 'core-js/es/reflect';

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
// Primer CSS is provided via angular.json test styles.
import { I18n } from 'i18n-js';
import { registerDialogStreamAction } from 'core-turbo/dialog-stream-action';

registerDialogStreamAction();

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access no-explicit-any
(window as any).global = window;

// Declare global I18n shim
window.I18n = new I18n();

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false },
  },
);

// Load all non-Vitest/Jest spec files. Exclude files ending with vitest.spec.ts or jest.spec.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requireAny: any = require as any;
// Only include specs under src/, exclude custom-elements subtree and Vitest/Jest patterns
// Limit Jasmine specs to Angular app and Stimulus; exclude vitest/jest and custom-elements
const context = requireAny.context(
  './src/',
  true,
  /^(app|stimulus)\/.*(?<!\.(vitest|jest)\.spec\.ts)\.spec\.ts$/,
);
context.keys().forEach(context);
