// Declarations to satisfy Karma/Jasmine TypeScript compilation for global usages

declare var I18n: any;

// Provide a broad lodash global for module files referencing UMD `_`
declare var _: any;

declare global {
  interface Window {
    OpenProject: any;
    appBasePath?: string;
    ErrorReporter?: any;
    I18n?: any;
    RB?: any;
  }
}

// Legacy RB namespace used in backlogs code
declare var RB: any;

// Stub dom-plane exports used in code
declare module 'dom-plane' {
  export function createPointCB(el: Element): (evt: MouseEvent | TouchEvent) => { x: number; y: number };
  export function getClientRect(el: Element): DOMRect;
  export function pointInside(rect: DOMRect, point: { x: number; y: number }): boolean;
}

// Stub idiomorph minimal export used
declare module 'idiomorph' {
  export class Idiomorph {
    static mutate(target: Element, html: string, options?: any): void;
  }
}

declare module '@uirouter/core' {
  interface UIRouterGlobals {
    // Some code uses params$ Observable on globals
    params$: any;
  }
}

declare module '@hotwired/turbo' {
  export const session: any;
}

export {};

// Additional ambient type stubs used by specs importing app modules
declare type RenderedWorkPackage = any;
declare type IGroupsCollapseEvent = any;
declare type IDayData = any;
declare type RelationsStateValue = any;
declare type RelationResource = any;
declare type GroupObject = any;
declare type HalResource = any;

declare var Mousetrap: any;

// Some specs import navigator from turbo; provide stub if needed
declare module '@hotwired/turbo' {
  export const navigator: any;
  interface StreamElement extends HTMLElement {
    templateElement: HTMLTemplateElement;
  }
}
