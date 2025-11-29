import { describe, it, expect, afterEach } from 'vitest';
import '../index';

function nextTick(): Promise<void> { return new Promise((resolve) => queueMicrotask(() => resolve())); }
function wait(ms: number): Promise<void> { return new Promise((resolve) => setTimeout(resolve, ms)); }

afterEach(async () => { await new Promise((r) => setTimeout(r, 0)); document.body.innerHTML = ''; });

describe('primer-icon custom element (Vitest)', () => {
  it('renders the specified icon by name', async () => {
    const el = document.createElement('primer-icon');
    el.setAttribute('name', 'plus');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    const icon = el.querySelector('[data-icon="plus"]');
    expect(icon).toBeTruthy();
  });

  it('applies size and aria-label', async () => {
    const el = document.createElement('primer-icon');
    el.setAttribute('name', 'pencil');
    el.setAttribute('size', '16');
    el.setAttribute('aria-label', 'Edit');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    const icon = el.querySelector('[data-icon="pencil"]');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('aria-label')).toBe('Edit');
  });

  it('updates when attributes change', async () => {
    const el = document.createElement('primer-icon');
    el.setAttribute('name', 'undo');
    document.body.appendChild(el);
    await nextTick();
    await wait(30);
    el.setAttribute('name', 'x');
    el.setAttribute('size', '24');
    await nextTick();
    await wait(30);
    const icon = el.querySelector('[data-icon="x"]');
    expect(icon).toBeTruthy();
  });
});
