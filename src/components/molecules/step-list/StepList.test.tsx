import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { StepList } from './StepList.js';
it('renders ordered steps with caller heading levels and localized rich content', () => {
  render(<StepList label="Review process" headingLevel={4} start={3} items={[{id:'review', title:'Review', description:<p>Inspect evidence</p>}, {id:'approve', title:'Approve', description:'Record decision'}]} />);
  const list = screen.getByRole('list', {name:'Review process'});
  expect(list).toHaveAttribute('start','3');
  expect(within(list).getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getByRole('heading',{name:'Review',level:4})).toBeVisible();
  expect(list).toHaveTextContent('Inspect evidence');
});
it('forwards native refs and supports empty lists', () => {
  const ref = {current:null};
  render(<StepList ref={ref} label="Steps" items={[]} dir="rtl" />);
  expect(ref.current).toBe(screen.getByRole('list',{name:'Steps'}));
  expect(ref.current).toHaveAttribute('dir','rtl');
});
