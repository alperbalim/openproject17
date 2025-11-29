describe('primer-button custom element (Vitest) - variants and leading icons', () => {
  function nextTick(): Promise<void> {
    return new Promise((resolve) => queueMicrotask(() => resolve()));
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  afterEach(async () => {
    await new Promise((r) => setTimeout(r, 0));
    document.body.innerHTML = '';
  });

  it('renders with leading icon (plus) and label', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.setAttribute('leading-icon', 'plus');
    el.textContent = 'Add';
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.includes('Add')).toBe(true);
  });

  it('supports variant updates without breaking render', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.textContent = 'Variant';
    document.body.appendChild(el);

    await nextTick();
    await wait(30);
    let button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    el.setAttribute('variant', 'primary');
    await nextTick();
    await wait(30);
    button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    el.setAttribute('variant', 'secondary');
    await nextTick();
    await wait(30);
    button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('supports leading-icon-size without breaking render', async () => {
    expect(customElements.get('primer-button')).toBeTruthy();
    const el = document.createElement('primer-button');
    el.setAttribute('leading-icon', 'plus');
    el.setAttribute('leading-icon-size', '16');
    el.textContent = 'Sized Icon';
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    let button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.includes('Sized Icon')).toBe(true);

    el.setAttribute('leading-icon-size', '24');
    await nextTick();
    await wait(30);
    button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
  });
});
