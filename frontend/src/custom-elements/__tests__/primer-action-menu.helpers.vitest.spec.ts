import { describe, it, expect } from 'vitest';

// Helper test: ensure ActionMenu.Button does not receive leadingVisual prop
// and overlay still rebuilds items via primer-action-list

describe('primer-action-menu helpers (Vitest)', () => {
  it('does not pass leadingVisual to native button and keeps aria-label', async () => {
    const el = document.createElement('primer-action-menu');
    const trigger = document.createElement('button');
    trigger.setAttribute('slot', 'button');
    trigger.setAttribute('variant', 'primary');
    trigger.setAttribute('aria-label', 'Menu');
    trigger.setAttribute('leading-icon', 'plus');

    const overlay = document.createElement('div');
    overlay.setAttribute('slot', 'overlay');
    const list = document.createElement('primer-action-list');
    const item = document.createElement('button');
    item.setAttribute('slot', 'item');
    item.textContent = 'Item A';
    list.appendChild(item);
    overlay.appendChild(list);

    el.appendChild(trigger);
    el.appendChild(overlay);
    document.body.appendChild(el);

    // Wait a tick for scheduled initial render
    await new Promise(r => setTimeout(r, 20));

    const sr = el.shadowRoot!;
    const btn = sr.querySelector('button');
    expect(btn).toBeTruthy();
    // aria-label should be applied
    expect(btn!.getAttribute('aria-label')).toBe('Menu');
    // Ensure we did not leak leadingVisual prop as a DOM attribute
    // (we do not set leadingVisual at all for ActionMenu.Button)
    expect(btn!.getAttribute('leadingVisual')).toBeNull();

    // Overlay rebuilt through primer-action-list
    const menu = sr.querySelector('[role="menu"]');
    expect(menu).toBeTruthy();
    const items = sr.querySelectorAll('[role="menuitem"]');
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].textContent).toContain('Item A');
  });
});
