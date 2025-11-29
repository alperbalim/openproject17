export function toDashedCase(camelCase:string):string {
  return camelCase.replace(
    /([a-z0-9])([A-Z])/g,
    (_:string, a:string, b:string) => `${a}-${b.toLowerCase()}`,
  );
}

export function toCamelCase(dashedCase:string):string {
  return dashedCase.replace(/[-:]([a-z])/g, (_:string, b:string) => `${b.toUpperCase()}`);
}

import React from 'react';
import { ActionList } from '@primer/react';

type ALType = typeof ActionList & {
  Heading: React.FC<any>;
  GroupHeading: React.FC<any>;
  Group: React.FC<any>;
  Item: React.FC<any>;
  LinkItem: React.FC<any>;
};

export function buildActionListChildren(listEl: HTMLElement, AL: ALType): React.ReactNode[] {
  const byId = (id: string | null) => (el: Element) => el.getAttribute('for') === id;
  const children: React.ReactNode[] = [];

  const heading = listEl.querySelector('[slot="heading"]') as HTMLElement | null;
  if (heading) children.push(React.createElement(AL.Heading, null, heading.textContent ?? ''));

  const groupHeading = listEl.querySelector('[slot="group-heading"]') as HTMLElement | null;
  if (groupHeading) children.push(React.createElement(AL.GroupHeading, null, groupHeading.textContent ?? ''));

  const groups = Array.from(listEl.querySelectorAll('[slot="group"]')) as HTMLElement[];
  groups.forEach(g => children.push(React.createElement(AL.Group, null, g.textContent)));

  const leadingVisuals = Array.from(listEl.querySelectorAll('[slot="leading-visual"]')) as HTMLElement[];
  const trailingVisuals = Array.from(listEl.querySelectorAll('[slot="trailing-visual"]')) as HTMLElement[];
  const trailingActions = Array.from(listEl.querySelectorAll('[slot="trailing-action"]')) as HTMLElement[];
  const descriptions = Array.from(listEl.querySelectorAll('[slot="description"]')) as HTMLElement[];

  const findAssoc = (arr: HTMLElement[], id: string | null) => arr.find(byId(id));

  const itemEls = Array.from(listEl.querySelectorAll('[slot="item"]')) as HTMLElement[];
  itemEls.forEach(el => {
    if (el.tagName.toLowerCase() === 'button' && !el.hasAttribute('type')) el.setAttribute('type', 'button');
    const id = el.getAttribute('id');
    const Leading = findAssoc(leadingVisuals, id);
    const Trailing = findAssoc(trailingVisuals, id);
    const TrailingAction = findAssoc(trailingActions, id);
    const Desc = findAssoc(descriptions, id);
    const leadingComp = Leading ? (() => React.createElement('span', { 'data-leading-visual': true }, Leading.textContent)) : undefined;
    const trailingComp = Trailing ? (() => React.createElement('span', { 'data-trailing-visual': true }, Trailing.textContent)) : undefined;
    const trailingActionComp = TrailingAction ? (() => React.createElement('span', { 'data-trailing-action': true }, TrailingAction.textContent)) : undefined;
    const descriptionText = Desc ? (Desc.textContent ?? '') : undefined;
    const onClick = () => { try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true })); } catch { void 0; } };
    children.push(React.createElement(AL.Item, {
      onClick,
      leadingVisual: leadingComp,
      trailingVisual: trailingComp,
      trailingAction: trailingActionComp,
      description: descriptionText,
      className: el.getAttribute('class') ?? undefined,
    }, el.textContent ?? ''));
  });

  const linkEls = Array.from(listEl.querySelectorAll('[slot="link-item"]')) as HTMLElement[];
  linkEls.forEach(li => {
    const id = li.getAttribute('id');
    const Leading = findAssoc(leadingVisuals, id);
    const Trailing = findAssoc(trailingVisuals, id);
    const TrailingAction = findAssoc(trailingActions, id);
    const Desc = findAssoc(descriptions, id);
    const leadingComp = Leading ? (() => React.createElement('span', { 'data-leading-visual': true }, Leading.textContent)) : undefined;
    const trailingComp = Trailing ? (() => React.createElement('span', { 'data-trailing-visual': true }, Trailing.textContent)) : undefined;
    const trailingActionComp = TrailingAction ? (() => React.createElement('span', { 'data-trailing-action': true }, TrailingAction.textContent)) : undefined;
    const descriptionText = Desc ? (Desc.textContent ?? '') : undefined;
    const onClick = () => { try { li.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true })); } catch { void 0; } };
    children.push(React.createElement(AL.LinkItem, {
      href: li.getAttribute('href') ?? undefined,
      onClick,
      leadingVisual: leadingComp,
      trailingVisual: trailingComp,
      trailingAction: trailingActionComp,
      description: descriptionText,
      className: li.getAttribute('class') ?? undefined,
    }, li.textContent ?? ''));
  });

  // Fallback default child elements treated as items/link-items
  const defaults = Array.from(listEl.childNodes) as ChildNode[];
  defaults.forEach(n => {
    if (n.nodeType !== 1) return; // ELEMENT_NODE
    const el = n as HTMLElement;
    if (el.hasAttribute('slot')) return; // already handled above
    if (el.tagName.toLowerCase() === 'button' && !el.hasAttribute('type')) el.setAttribute('type', 'button');
    const id = el.getAttribute('id');
    const Leading = findAssoc(leadingVisuals, id);
    const Trailing = findAssoc(trailingVisuals, id);
    const TrailingAction = findAssoc(trailingActions, id);
    const Desc = findAssoc(descriptions, id);
    const leadingComp = Leading ? (() => React.createElement('span', { 'data-leading-visual': true }, Leading.textContent)) : undefined;
    const trailingComp = Trailing ? (() => React.createElement('span', { 'data-trailing-visual': true }, Trailing.textContent)) : undefined;
    const trailingActionComp = TrailingAction ? (() => React.createElement('span', { 'data-trailing-action': true }, TrailingAction.textContent)) : undefined;
    const descriptionText = Desc ? (Desc.textContent ?? '') : undefined;
    const onClick = () => { try { el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true })); } catch { void 0; } };
    const isLink = el.tagName.toLowerCase() === 'a' || el.hasAttribute('href');
    if (isLink) {
      children.push(React.createElement(AL.LinkItem, {
        href: el.getAttribute('href') ?? undefined,
        onClick,
        leadingVisual: leadingComp,
        trailingVisual: trailingComp,
        trailingAction: trailingActionComp,
        description: descriptionText,
        className: el.getAttribute('class') ?? undefined,
      }, el.textContent ?? ''));
    } else {
      children.push(React.createElement(AL.Item, {
        onClick,
        leadingVisual: leadingComp,
        trailingVisual: trailingComp,
        trailingAction: trailingActionComp,
        description: descriptionText,
        className: el.getAttribute('class') ?? undefined,
      }, el.textContent ?? ''));
    }
  });

  return children;
}
