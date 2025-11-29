import { describe, it, expect, beforeEach } from 'vitest';

import '../index';

function makeEl(tag:string, attrs:Record<string,string>={}, text?:string) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));
  if (text) el.textContent = text;
  return el;
}

describe('primer-action-list', () => {
  let host:HTMLElement;
  const wait = () => new Promise(resolve => setTimeout(resolve, 25));
  beforeEach(() => {
    host = document.createElement('primer-action-list');
    document.body.appendChild(host);
  });

  it('renders heading and group heading', async () => {
    const heading = makeEl('div', { slot: 'heading' }, 'Main Heading');
    const groupHeading = makeEl('div', { slot: 'group-heading' }, 'Group A');
    host.append(heading, groupHeading);

    await wait();
    const sr = host.shadowRoot!;
    expect(sr.querySelector('[data-heading]')?.textContent).toBe('Main Heading');
    expect(sr.querySelector('[data-group-heading]')?.textContent).toBe('Group A');
  });

  it('associates link items with visuals and description via for=id', async () => {
    const item = makeEl('a', { slot: 'link-item', id: 'item-1', href: '#'}, 'Item One');
    const leading = makeEl('span', { slot: 'leading-visual', for: 'item-1' }, 'Plus');
    const trailing = makeEl('span', { slot: 'trailing-visual', for: 'item-1' }, 'Arrow');
    const trailingAction = makeEl('span', { slot: 'trailing-action', for: 'item-1' }, 'Act');
    const description = makeEl('span', { slot: 'description', for: 'item-1' }, 'Details');
    host.append(item, leading, trailing, trailingAction, description);

    await wait();
    const sr = host.shadowRoot!;
    const anchor = sr.querySelector('a[role="menuitem"]')!;
    expect(anchor.querySelector('[data-leading-visual]')?.textContent).toBe('Plus');
    expect(anchor.querySelector('[data-trailing-visual]')?.textContent).toBe('Arrow');
    expect(anchor.querySelector('[data-description]')?.textContent).toBe('Details');
  });

  it('renders groups', async () => {
    const group = makeEl('div', { slot: 'group' }, 'Group Content');
    host.append(group);
    await wait();
    const sr = host.shadowRoot!;
    expect(sr.querySelector('[data-group]')?.textContent).toBe('Group Content');
  });
});
