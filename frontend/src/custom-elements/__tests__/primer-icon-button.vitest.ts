import { describe, it, expect, afterEach } from 'vitest';
import '../index';

function nextTick(): Promise<void> { return new Promise((resolve) => queueMicrotask(() => resolve())); }
function wait(ms: number): Promise<void> { return new Promise((resolve) => setTimeout(resolve, ms)); }

afterEach(async () => { await new Promise((r) => setTimeout(r, 0)); document.body.innerHTML = ''; });

describe('primer-icon-button custom element (Vitest)', () => {
  it('renders with aria-label and disabled state', async () => {
    const el = document.createElement('primer-icon-button');
    el.setAttribute('aria-label', 'Settings');
    el.setAttribute('inactive', '');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    const button = el.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Settings');
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('updates when attributes change', async () => {
    const el = document.createElement('primer-icon-button');
    el.setAttribute('aria-label', 'Gear');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    el.setAttribute('aria-label', 'Cog');
    el.setAttribute('loading', '');
    await nextTick();
    await wait(30);
    const button = el.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Cog');
    expect(el.hasAttribute('loading')).toBe(true);
  });

  it('supports variant prop without breaking render', async () => {
    const el = document.createElement('primer-icon-button');
    el.setAttribute('aria-label', 'Fav');
    el.setAttribute('variant', 'primary');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    const button = el.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Fav');
  });

  it('supports size prop (small/medium/large)', async () => {
    const el = document.createElement('primer-icon-button');
    el.setAttribute('aria-label', 'Sized');
    el.setAttribute('size', 'small');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    let button = el.querySelector('button');
    expect(button).toBeTruthy();
    el.setAttribute('size', 'medium');
    await nextTick();
    await wait(30);
    button = el.querySelector('button');
    expect(button).toBeTruthy();
    el.setAttribute('size', 'large');
    await nextTick();
    await wait(30);
    button = el.querySelector('button');
    expect(button).toBeTruthy();
  });
});
