/*
  Basic Jasmine specs for the `primer-button` custom element.
  Verifies rendering of inner text and that changing `variant` does not break rendering
  and affects the underlying button's class list.
*/

describe('primer-button custom element', () => {
  function nextTick(): Promise<void> {
    return new Promise((resolve) => queueMicrotask(() => resolve()));
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeAll(() => {
    // Ensure the element is defined by importing registration index.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('./index');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders inner text into the underlying button', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.textContent = 'Click Me';
    document.body.appendChild(el);

    // Allow custom element lifecycle + React render to occur.
    await nextTick();
    await wait(30);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.trim()).toBe('Click Me');
  });

  it('renders for different `variant` values and updates class list', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.textContent = 'Variant Test';
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    const initialClass = button?.className || '';

    // Change variant and ensure a re-render occurs.
    el.setAttribute('variant', 'primary');
    await nextTick();
    await wait(30);
    const classPrimary = el.shadowRoot?.querySelector('button')?.className || '';

    el.setAttribute('variant', 'secondary');
    await nextTick();
    await wait(30);
    const classSecondary = el.shadowRoot?.querySelector('button')?.className || '';

    // Expect class lists to differ across variants (generic check without relying on exact class names).
    expect(classPrimary).not.toBe(initialClass);
    expect(classSecondary).not.toBe(classPrimary);

    // Still renders text correctly
    expect(el.shadowRoot?.querySelector('button')?.textContent?.trim()).toBe('Variant Test');
  });
});
