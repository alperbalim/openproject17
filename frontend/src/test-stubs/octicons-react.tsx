import React from 'react';

type IconProps = { size?: number; className?: string; 'aria-label'?: string };
export const PlusIcon: React.FC<IconProps> = (p) => <span data-icon="plus" className={p.className} aria-label={p['aria-label']} />;
export const PencilIcon: React.FC<IconProps> = (p) => <span data-icon="pencil" className={p.className} aria-label={p['aria-label']} />;
export const GrabberIcon: React.FC<IconProps> = (p) => <span data-icon="grabber" className={p.className} aria-label={p['aria-label']} />;
export const UndoIcon: React.FC<IconProps> = (p) => <span data-icon="undo" className={p.className} aria-label={p['aria-label']} />;
export const XIcon: React.FC<IconProps> = (p) => <span data-icon="x" className={p.className} aria-label={p['aria-label']} />;

export default {};
