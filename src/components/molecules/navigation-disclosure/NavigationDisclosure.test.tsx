import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { NavigationDisclosure } from './NavigationDisclosure.js';
it('dismisses on Escape, outside pointer, link activation and focus leaving; Escape restores focus', async () => {
 const user = userEvent.setup();
 render(<><NavigationDisclosure label='Product'><a href='#overview'>Overview</a></NavigationDisclosure><button>Outside</button></>);
 const trigger = screen.getByRole('button', { name: 'Product' });
 await user.click(trigger);
 expect(trigger).toHaveAttribute('aria-expanded', 'true');
 await user.tab(); await user.keyboard('{Escape}');
 expect(trigger).toHaveFocus();
 expect(trigger).toHaveAttribute('aria-expanded', 'false');
 await user.click(trigger); await user.click(screen.getByRole('link'));
 expect(trigger).toHaveAttribute('aria-expanded', 'false');
 await user.click(trigger);
 fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
 expect(trigger).toHaveAttribute('aria-expanded', 'false');
 await user.click(trigger); await user.tab(); await user.tab();
 expect(trigger).toHaveAttribute('aria-expanded', 'false');
});
it('reports controlled requests without taking ownership', async () => {
 const onOpenChange = vi.fn();
 render(<NavigationDisclosure label='Product' open={false} onOpenChange={onOpenChange}><a href='/'>Home</a></NavigationDisclosure>);
 await userEvent.click(screen.getByRole('button'));
 expect(onOpenChange).toHaveBeenCalledWith(true);
 expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
});
