describe('primer-action-menu custom element (Vitest)', () => {
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

  it('renders trigger label from slotted button', async () => {
    expect(customElements.get('primer-action-menu')).toBeTruthy();
    const el = document.createElement('primer-action-menu');

    const trigger = document.createElement('button');
    trigger.setAttribute('slot', 'button');
    trigger.textContent = 'Actions';

    el.appendChild(trigger);
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const renderedTrigger = el.shadowRoot?.querySelector('button');
    expect(renderedTrigger).toBeTruthy();
    expect(renderedTrigger?.textContent?.includes('Actions')).toBe(true);
  });

  it('renders overlay items and forwards click events', async () => {
    expect(customElements.get('primer-action-menu')).toBeTruthy();
    const el = document.createElement('primer-action-menu');

    const trigger = document.createElement('button');
    trigger.setAttribute('slot', 'button');
    trigger.textContent = 'Menu';

    const overlay = document.createElement('div');
    overlay.setAttribute('slot', 'overlay');

    const list = document.createElement('primer-action-list');
    const linkItem = document.createElement('a');
    linkItem.setAttribute('slot', 'link-item');
    linkItem.setAttribute('id', 'item-1');
    linkItem.setAttribute('href', '#');
    linkItem.textContent = 'Item 1';
    const spy = vi.fn();
    linkItem.addEventListener('click', spy);
    list.appendChild(linkItem);
    overlay.appendChild(list);

    el.appendChild(trigger);
    el.appendChild(overlay);
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const renderedMenu = el.shadowRoot?.querySelector('[role="menu"]');
    expect(renderedMenu).toBeTruthy();
    const listEl = document.querySelector('primer-action-list');
    expect(listEl).toBeTruthy();
    const renderedItems = listEl?.shadowRoot?.querySelectorAll('a[role="menuitem"]') ?? [];
    expect(renderedItems.length).toBe(1);
    (renderedItems[0] as HTMLElement).click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('supports trigger variant and leading icon without breaking render', async () => {
    expect(customElements.get('primer-action-menu')).toBeTruthy();
    const el = document.createElement('primer-action-menu');

    const trigger = document.createElement('button');
    trigger.setAttribute('slot', 'button');
    trigger.setAttribute('variant', 'primary');
    trigger.setAttribute('leading-icon', 'plus');
    trigger.setAttribute('leading-icon-size', '16');
    trigger.textContent = 'Do It';

    el.appendChild(trigger);
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const renderedTrigger = el.shadowRoot?.querySelector('button');
    expect(renderedTrigger).toBeTruthy();
    expect(renderedTrigger?.textContent?.includes('Do It')).toBe(true);
  });

  it('supports aria-label on trigger', async () => {
    expect(customElements.get('primer-action-menu')).toBeTruthy();
    const el = document.createElement('primer-action-menu');

    const trigger = document.createElement('button');
    trigger.setAttribute('slot', 'button');
    trigger.setAttribute('aria-label', 'Actions Label');
    trigger.textContent = 'Actions';

    el.appendChild(trigger);
    document.body.appendChild(el);

    await nextTick();
    await wait(30);

    const renderedTrigger = el.shadowRoot?.querySelector('button');
    expect(renderedTrigger).toBeTruthy();
    expect(renderedTrigger?.getAttribute('aria-label')).toBe('Actions Label');
  });
});
