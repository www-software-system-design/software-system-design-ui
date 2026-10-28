import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Timeline } from './Timeline.js';
it('renders caller milestones in order with heading depth and optional metadata', () => {
  render(<Timeline label="Journey" headingLevel={4} items={[{id:'one', phase:'First phase', title:'Define', description:<p>Intent</p>, status:'Planned'}, {id:'two', title:'Deliver', description:'Preview'}]} />);
  const list = screen.getByRole('list', {name:'Journey'});
  expect(within(list).getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getByRole('heading', {level:4, name:'Define'})).toBeVisible();
  expect(list).toHaveTextContent('First phasePlannedDefineIntentDeliverPreview');
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
it('supports an empty localized list and native refs', () => {
  const ref = {current:null};
  render(<Timeline ref={ref} label="Etapes" dir="rtl" items={[]} />);
  expect(ref.current).toBe(screen.getByRole('list', {name:'Etapes'}));
  expect(ref.current).toHaveAttribute('dir', 'rtl');
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});
