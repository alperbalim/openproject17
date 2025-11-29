import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const ActionList: React.FC<{ children?: React.ReactNode }> & {
  Item?: React.FC<{ children?: React.ReactNode; onSelect?: () => void }>;
} = (({ children }) => <div>{children}</div>) as any;

(ActionList as any).Item = ({ children, onSelect }) => (
  <div role="menuitem" onClick={onSelect}>
    {children}
  </div>
);

export const ActionMenu: React.FC<{ children?: React.ReactNode }> & {
  Root?: React.FC<{ children?: React.ReactNode }>;
  Trigger?: React.FC<{ children?: React.ReactNode }>;
  Content?: React.FC<{ children?: React.ReactNode }>;
} = (({ children }) => <div>{children}</div>) as any;

(ActionMenu as any).Root = ({ children }) => <div>{children}</div>;
(ActionMenu as any).Trigger = ({ children }) => <button>{children}</button>;
(ActionMenu as any).Content = ({ children }) => <div role="menu">{children}</div>;

export default {};
