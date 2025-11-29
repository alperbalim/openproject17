/*
  Jest specs for the `primer-button` custom element.
  Verifies rendering of inner text and that changing `variant` does not break rendering.
*/

describe('primer-button custom element (Jest)', () => {
  function nextTick(): Promise<void> {
    return new Promise((resolve) => queueMicrotask(() => resolve()));
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeAll(() => {
    // Ensure the element is defined by importing registration index.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../index');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders inner text into the underlying button', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.textContent = 'Click Me';
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.trim()).toBe('Click Me');
  });

  it('renders consistently when `variant` changes', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.textContent = 'Variant Test';
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const button1 = el.shadowRoot?.querySelector('button');
    expect(button1).toBeTruthy();

    el.setAttribute('variant', 'primary');
    await nextTick();
    await wait(30);
    const button2 = el.shadowRoot?.querySelector('button');
    expect(button2).toBeTruthy();
    expect(button2?.textContent?.trim()).toBe('Variant Test');

    el.setAttribute('variant', 'secondary');
    await nextTick();
    await wait(30);
    const button3 = el.shadowRoot?.querySelector('button');
    expect(button3).toBeTruthy();
    expect(button3?.textContent?.trim()).toBe('Variant Test');
  });
});
