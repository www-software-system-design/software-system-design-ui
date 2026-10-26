import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PrincipleList } from './PrincipleList.js';
it('renders ordered caller-labelled principles', () => {
 render(<PrincipleList label='Principles' items={[{ id: 'people', title: 'People lead', description: 'People set direction.' }, { id: 'open', title: 'Open participation', description: 'Everyone can contribute.' }]} />);
 const list = screen.getByRole('list', { name: 'Principles' });
 expect(list.tagName).toBe('OL');
 expect(within(list).getAllByRole('listitem')).toHaveLength(2);
 expect(within(list).getByText('People set direction.')).toBeVisible();
});
