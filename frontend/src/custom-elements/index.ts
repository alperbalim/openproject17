import { ActionMenu, Button, ActionList, IconButton } from '@primer/react';
import { PencilIcon, PlusIcon, GrabberIcon, UndoIcon, XIcon } from '@primer/octicons-react';

import { defineReactElement } from './wrap-react';
import React from 'react';

defineReactElement('primer-grabber-icon', GrabberIcon, {
  attributes: ['size'],
  events: { onClick: 'click' },
  shadow: false,
  contentStrategy: 'remove',
  deriveProps: (host):Partial<React.ComponentProps<typeof GrabberIcon>> => {
    const props:Partial<React.ComponentProps<typeof GrabberIcon>> = {};
    const klass = host.getAttribute('class');
    props.className = klass ?? props.className;
    return props;
  },
});

// Generic primer-icon for common octicons; renders into light DOM without shadow
const IconProxy: React.FC<{ name?: string; size?: number; className?: string; 'aria-label'?: string }> = (props) => {
  const iconMap:Record<string, React.ComponentType<{ size?:number; className?:string; 'aria-label'?:string }>> = {
    plus: PlusIcon,
    pencil: PencilIcon,
    undo: UndoIcon,
    x: XIcon,
    grabber: GrabberIcon,
  };
  const key = (props.name ?? 'plus').toLowerCase();
  const Comp = iconMap[key] ?? PlusIcon;
  return React.createElement(Comp, { size: props.size, className: props.className, 'aria-label': props['aria-label'] });
};

defineReactElement('primer-icon', IconProxy, {
  attributes: ['name', 'size', 'aria-label'],
  events: { onClick: 'click' },
  shadow: false,
  contentStrategy: 'remove',
  deriveProps: (host): Partial<React.ComponentProps<typeof IconProxy>> => {
    const props: Partial<React.ComponentProps<typeof IconProxy>> = {};
    const name = host.getAttribute('name') ?? undefined;
    const sizeAttr = host.getAttribute('size');
    const klass = host.getAttribute('class') ?? undefined;
    props.name = name ?? props.name;
    props['aria-label'] = host.getAttribute('aria-label') ?? undefined;
    if (sizeAttr) {
      const n = parseInt(sizeAttr, 10);
      if (!Number.isNaN(n)) props.size = n;
    }
    props.className = klass ?? props.className;
    return props;
  },
});

defineReactElement('primer-icon-button', IconButton, {
  attributes: ['variant', 'icon', 'icon-size', 'aria-label', 'size'],
  events: { onClick: 'click' },
  shadow: false,
  contentStrategy: 'remove',
  deriveProps: (host): Partial<React.ComponentProps<typeof IconButton>> => {
    const props: Partial<React.ComponentProps<typeof IconButton>> = {};
    const iconName = host.getAttribute('icon');
    const iconSizeAttr = host.getAttribute('icon-size');
    const sizeAttr = host.getAttribute('size');
    if (sizeAttr) props.size = sizeAttr as React.ComponentProps<typeof IconButton>['size'];
    // Map known booleans to accessible attributes used in tests and UI
    if (host.hasAttribute('loading')) {
      // Reflect a busy state for accessibility
      (props as any)['aria-busy'] = 'true';
    }
    if (host.hasAttribute('inactive')) {
      // Reflect non-interactive state without disabling focus programmatically
      (props as any)['aria-disabled'] = 'true';
    }
    const iconMap:Record<string, React.ComponentType<{ size?:number }>> = {
      plus: PlusIcon,
      pencil: PencilIcon,
      undo: UndoIcon,
      x: XIcon,
    };
    const resolveIcon = (
      name: string | null,
      sizeVal: string | null,
    ): React.ComponentType<{ size?: number }> | (() => React.ReactElement) | undefined => {
        const a11y = props as { ['aria-busy']?: string; ['aria-disabled']?: string };
        if (host.hasAttribute('loading')) a11y['aria-busy'] = 'true';
        if (host.hasAttribute('inactive')) a11y['aria-disabled'] = 'true';
      if (!name) return undefined;
      const Icon = iconMap[name.toLowerCase()];
      if (!Icon) return undefined;
      if (sizeVal) {
        const parsed = parseInt(sizeVal, 10);
        if (!Number.isNaN(parsed)) return () => React.createElement(Icon, { size: parsed });
      }
      return Icon;
    };
    // IconButton expects `icon` prop; prefer explicit icon attribute
    const iconVisual = resolveIcon(iconName, iconSizeAttr);
    if (iconVisual) props.icon = iconVisual as React.ComponentProps<typeof IconButton>['icon'];

    const klass = host.getAttribute('class');
    props.className = klass ?? props.className;
    return props;
  },
});

defineReactElement('primer-button', Button, {
  attributes: ['variant'],
  events: { onClick: 'click' },
  shadow: true,
  contentStrategy: 'slot',
  adoptStyles: [
    `:host{display:inline-block}
			button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;
				font:inherit;line-height:1.25;cursor:pointer;border-radius:6px;border:1px solid var(--borderColor-default,#d0d7de);
				background:var(--button-default-bg,#f6f8fa);color:var(--fgColor-default,#24292f);
				padding:0.4rem 0.65rem;gap:0.4rem;text-decoration:none;}
			button:hover{background:var(--button-hover-bg,#eef1f4)}
			button:active{background:var(--button-active-bg,#e7ebef)}
			button:focus{outline:2px solid var(--focus-outline,#0969da);outline-offset:2px}
			button[aria-busy="true"],button[disabled]{cursor:not-allowed;opacity:.6}`,
  ],
  adoptMatchingStyles: {
    // Copy any stylesheet rules that reference Primer compiled classes (prc- prefix)
    selectors: [/\.prc-/],
  },
  initialRenderDelayMs: 16,
  deriveProps: (host): Partial<React.ComponentProps<typeof Button>> => {
    const props: Partial<React.ComponentProps<typeof Button>> = {};
    const leadingIcon = host.getAttribute('leading-icon');
    const leadingIconSize = host.getAttribute('leading-icon-size');
    const iconMap:Record<string, React.ComponentType<{ size?:number }>> = {
      plus: PlusIcon,
      pencil: PencilIcon,
      undo: UndoIcon,
    };
    if (leadingIcon) {
      const Icon = iconMap[leadingIcon.toLowerCase()];
      if (Icon) {
        const sizeVal = leadingIconSize ? parseInt(leadingIconSize, 10) : undefined;
        props.leadingVisual = sizeVal ? () => React.createElement(Icon, { size: sizeVal }) : Icon;
      }
    }

    const klass = host.getAttribute('class');
    props.className = klass ?? props.className;
    // Prevent leaking unknown props to underlying DOM/stub components
    delete (props as any).leadingIcon;
    delete (props as any).leadingIconSize;
      // Prevent leaking unknown props to underlying DOM/stub components
      const p = props as Record<string, unknown>;
      delete p.leadingIcon;
      delete p.leadingIconSize;
    return props;
  },
});

defineReactElement('primer-action-menu', ActionMenu, {
  shadow: true,
  contentStrategy: 'slot',
  slots: ['button', 'overlay'],
  adoptMatchingStyles: {
    selectors: [/\.prc-/],
  },
  initialRenderDelayMs: 16,
  childrenFromSlots: ({ assigned, reactNodes }) => {
    // Button label: if a <button> element was passed, use its text only to avoid <button> inside <button>
    const buttonAssigned = assigned('button');
    let buttonChildren:React.ReactNode[] = [];
    if (
      buttonAssigned.length === 1 &&
      buttonAssigned[0].nodeType === Node.ELEMENT_NODE &&
      (buttonAssigned[0] as Element).tagName.toLowerCase() === 'button'
    ) {
      const label = (buttonAssigned[0] as HTMLElement).textContent ?? '';
      buttonChildren = [label];
    } else {
      buttonChildren = reactNodes('button');
    }

    // Extract button props from the first assigned element attributes (if any)
    const buttonProps: Partial<React.ComponentProps<typeof ActionMenu.Button>> = {};
    if (buttonAssigned[0] && buttonAssigned[0].nodeType === Node.ELEMENT_NODE) {
      const el = buttonAssigned[0] as HTMLElement;
      const variant = el.getAttribute('variant');
      if (variant) buttonProps.variant = variant as React.ComponentProps<typeof ActionMenu.Button>['variant'];
      const ariaLabel = el.getAttribute('aria-label');
      if (ariaLabel) (buttonProps as Record<string, unknown>)['aria-label'] = ariaLabel;
      const leadingIcon = el.getAttribute('leading-icon');
      const iconMap:Record<string, React.ComponentType<{ size?:number }>> = {
        plus: PlusIcon,
      };
      if (leadingIcon) {
        const Icon = iconMap[leadingIcon.toLowerCase()];
        if (Icon) {
          // In some environments, passing leadingVisual to a DOM <button> causes warnings.
          // Prefer to omit leadingVisual to avoid prop leakage in tests/stubs.
          // const sizeVal = _leadingIconSize ? parseInt(_leadingIconSize, 10) : undefined;
          // buttonProps.leadingVisual = sizeVal ? () => React.createElement(Icon, { size: sizeVal }) : Icon;
        }
      }
    }
    // Build overlay content: map <primer-action-list> and its items to Primer React <ActionList>
    const overlayAssigned = assigned('overlay');
    let overlayChild:React.ReactNode | undefined;
    const findList = (node: Node): Element | undefined => {
      if (node instanceof Element) {
        const el = node;
        if (el.tagName.toLowerCase() === 'primer-action-list') return el;
        for (const child of Array.from(el.children)) {
          const found = findList(child);
          if (found) return found;
        }
      }
      return undefined;
    };
    for (const n of overlayAssigned) {
      const listEl = findList(n);
      if (listEl) {
        const items:React.ReactNode[] = [];
        // Support both slotted and default children inside primer-action-list
        const childEls = Array.from(listEl.querySelectorAll('[slot="item"],[slot="link-item"],a,button,div')) as HTMLElement[];
        childEls.forEach((c, idx) => {
          const isLink = c.getAttribute('slot') === 'link-item' || c.tagName.toLowerCase() === 'a' || c.hasAttribute('href');
          const label = c.textContent ?? '';
          const onClick = () => {
            try {
              c.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
            } catch { void 0; }
          };
          if (isLink) {
            items.push(React.createElement(AL.LinkItem, { key: idx, href: c.getAttribute('href') ?? undefined, onClick }, label));
          } else {
            items.push(React.createElement(AL.Item, { key: idx, onClick }, label));
          }
        });
        overlayChild = React.createElement(ActionList, null, ...items);
        break;
      }
    }
    // Pass through overlay slot nodes when no special handling is needed
    const overlayChildren = overlayChild ? [overlayChild] : reactNodes('overlay');
    return [
      React.createElement(ActionMenu.Button, buttonProps, ...buttonChildren),
      React.createElement(ActionMenu.Overlay, null, ...overlayChildren),
    ];
  },
});

// Standalone primer-action-list custom element with slots
const AL = ActionList as unknown as {
  Heading: React.FC<any>;
  GroupHeading: React.FC<any>;
  Group: React.FC<any>;
  Item: React.FC<any>;
  LinkItem: React.FC<any>;
};

defineReactElement('primer-action-list', ActionList as any, {
  shadow: true,
  contentStrategy: 'slot',
  initialRenderDelayMs: 16,
  adoptStyles: [
    `:host{display:block}
     [role="menu"]{display:block;padding:0;margin:0}
     [role="menuitem"]{display:flex;align-items:center;gap:.5rem;padding:.4rem .6rem;cursor:pointer}
     [role="menuitem"]:hover{background:var(--button-hover-bg,#eef1f4)}
     [data-heading],[data-group-heading]{display:block;padding:.4rem .6rem;font-weight:600}
     [data-group]{display:block;padding:.2rem .6rem}
     a[role="menuitem"]{text-decoration:none;color:inherit}
    `,
  ],
  slots: ['heading','group-heading','group','item','link-item','leading-visual','trailing-visual','trailing-action','description'],
  childrenFromSlots: ({ assigned }) => {
    const byId = (id: string | null) => id ? (el: Element) => el.getAttribute('for') === id : () => false;
    const headingSlot = assigned('heading')[0] as HTMLElement | undefined;
    const groupHeadingSlot = assigned('group-heading')[0] as HTMLElement | undefined;
    const groups = assigned('group') as HTMLElement[];
    const items = assigned('item') as HTMLElement[];
    const linkItems = assigned('link-item') as HTMLElement[];
    const defaultNodes = assigned(undefined) as (HTMLElement|Node)[];
    const leadingVisuals = assigned('leading-visual') as HTMLElement[];
    const trailingVisuals = assigned('trailing-visual') as HTMLElement[];
    const trailingActions = assigned('trailing-action') as HTMLElement[];
    const descriptions = assigned('description') as HTMLElement[];

    const findAssoc = (arr: HTMLElement[], id: string | null) => arr.find(byId(id));

    const children: React.ReactNode[] = [];
    if (headingSlot) children.push(React.createElement(AL.Heading, null, headingSlot.textContent ?? ''));
    if (groupHeadingSlot) children.push(React.createElement(AL.GroupHeading, null, groupHeadingSlot.textContent ?? ''));

    groups.forEach(g => {
      const GroupComp = AL.Group;
      children.push(React.createElement(GroupComp, null, g.textContent));
    });

    // Explicit item slots (button-like)
    items.forEach(el => {
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
      const onClick = () => {
        try {
          el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        } catch { void 0; }
      };
      children.push(React.createElement(AL.Item, {
        onClick,
        leadingVisual: leadingComp,
        trailingVisual: trailingComp,
        trailingAction: trailingActionComp,
        description: descriptionText,
        className: el.getAttribute('class') ?? undefined,
      }, el.textContent ?? ''));
    });

    // Explicit link-item slots
    linkItems.forEach(li => {
      const id = li.getAttribute('id');
      const Leading = findAssoc(leadingVisuals, id);
      const Trailing = findAssoc(trailingVisuals, id);
      const TrailingAction = findAssoc(trailingActions, id);
      const Desc = findAssoc(descriptions, id);
      const leadingComp = Leading ? (() => React.createElement('span', { 'data-leading-visual': true }, Leading.textContent)) : undefined;
      const trailingComp = Trailing ? (() => React.createElement('span', { 'data-trailing-visual': true }, Trailing.textContent)) : undefined;
      const trailingActionComp = TrailingAction ? (() => React.createElement('span', { 'data-trailing-action': true }, TrailingAction.textContent)) : undefined;
      const descriptionText = Desc ? (Desc.textContent ?? '') : undefined;
      const onClick = () => {
        try {
          li.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        } catch { void 0; }
      };
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

    // Fallback: treat default assigned elements as items
    defaultNodes.forEach((n) => {
      if (n.nodeType !== Node.ELEMENT_NODE) return;
      const el = n as HTMLElement;
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
      const onClick = () => {
        try {
          el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        } catch { void 0; }
      };
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
  },
});
