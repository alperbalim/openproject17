import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { leadingVisual?: React.ComponentType<any>; variant?: string }>
  = ({ children, leadingVisual: Leading, variant, className, ...props }) => (
  <button data-variant={variant} className={className} {...props}>
    {Leading ? <Leading data-leading-visual /> : null}
    {children}
  </button>
);

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const ActionList: React.FC<{ children?: React.ReactNode }> & {
  Item?: React.FC<{ children?: React.ReactNode; onClick?: () => void; leadingVisual?: React.ComponentType<any>; trailingVisual?: React.ComponentType<any>; trailingAction?: React.ComponentType<any>; description?: React.ReactNode; className?: string }>;
  LinkItem?: React.FC<{ children?: React.ReactNode; href?: string; leadingVisual?: React.ComponentType<any>; trailingVisual?: React.ComponentType<any>; description?: React.ReactNode; className?: string }>;
  Group?: React.FC<{ children?: React.ReactNode }>;
  GroupHeading?: React.FC<{ children?: React.ReactNode }>;
  Heading?: React.FC<{ children?: React.ReactNode }>;
} = (({ children }) => <div role="menu">{children}</div>) as any;

(ActionList as any).Item = ({ children, onClick, leadingVisual: Leading, trailingVisual: Trailing, trailingAction: TrailingAction, description, className }) => (
  <div role="menuitem" className={className} onClick={onClick}>
    {Leading ? <Leading data-leading-visual /> : null}
    <span data-content>{children}</span>
    {description ? <span data-description>{description}</span> : null}
    {Trailing ? <Trailing data-trailing-visual /> : null}
    {TrailingAction ? <button data-trailing-action onClick={(e)=>{e.stopPropagation();}}><TrailingAction /></button> : null}
  </div>
);
(ActionList as any).LinkItem = ({ children, href, onClick, leadingVisual: Leading, trailingVisual: Trailing, description, className }) => (
  <a role="menuitem" className={className} href={href} onClick={onClick}>
    {Leading ? <Leading data-leading-visual /> : null}
    <span data-content>{children}</span>
    {description ? <span data-description>{description}</span> : null}
    {Trailing ? <Trailing data-trailing-visual /> : null}
  </a>
);
(ActionList as any).Group = ({ children }) => <div data-group>{children}</div>;
(ActionList as any).GroupHeading = ({ children }) => <h3 data-group-heading>{children}</h3>;
(ActionList as any).Heading = ({ children }) => <h2 data-heading>{children}</h2>;

export const ActionMenu: React.FC<{ children?: React.ReactNode }> & {
  Button?: React.FC<{ children?: React.ReactNode }>
  Overlay?: React.FC<{ children?: React.ReactNode }>
} = (({ children }) => <div>{children}</div>) as any;

(ActionMenu as any).Button = ({ children, ...props }) => <button {...props}>{children}</button>;
(ActionMenu as any).Overlay = ({ children }) => <div role="menu">{children}</div>;

export default {};
