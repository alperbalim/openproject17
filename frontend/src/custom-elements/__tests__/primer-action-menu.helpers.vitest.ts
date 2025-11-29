import { describe, it, expect } from 'vitest';
import '../index';

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('primer-action-menu helpers', () => {
  it('does not leak leadingVisual and rebuilds overlay via action-list', async () => {
    const host = document.createElement('primer-action-menu');
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'options');
    btn.setAttribute('leading-icon', 'plus');
    btn.textContent = 'Open';
    const overlay = document.createElement('div');
    const list = document.createElement('primer-action-list');
    const link = document.createElement('a');
    link.setAttribute('slot', 'link-item');
    link.setAttribute('href', '#');
    link.textContent = 'Go';
    overlay.appendChild(list);
    list.appendChild(link);

    host.appendChild(btn);
    host.appendChild(overlay);
    document.body.appendChild(host);
    await wait(20);

    const sr = host.shadowRoot!;
    const trigger = sr.querySelector('button');
    expect(trigger).toBeTruthy();
    expect(trigger?.getAttribute('aria-label')).toBe('options');
    // Ensure no leadingVisual leaked to the DOM button
    expect(trigger?.getAttribute('leadingVisual')).toBeNull();

    const listEl = sr.querySelector('primer-action-list');
    expect(listEl).toBeTruthy();
    const renderedItems = listEl?.shadowRoot?.querySelectorAll('a[role="menuitem"]');
    expect(renderedItems?.length).toBe(1);
  });
});
