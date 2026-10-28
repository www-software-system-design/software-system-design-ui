import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Callout } from './Callout.js';
it('labels a static complementary landmark without announcing a live alert', () => {
  render(<Callout title="Authority and limits" headingLevel={4}><p>Human review</p></Callout>);
  expect(screen.getByRole('complementary',{name:'Authority and limits'})).toHaveTextContent('Human review');
  expect(screen.getByRole('heading',{level:4})).toHaveTextContent('Authority and limits');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
it('generates independent heading associations and preserves explicit IDs and refs', () => {
  const ref = {current:null};
  render(<><Callout title="One" /><Callout ref={ref} title="Two" headingId="limits" /></>);
  const panels = screen.getAllByRole('complementary');
  expect(panels[0]!.getAttribute('aria-labelledby')).not.toBe('limits');
  expect(ref.current).toBe(panels[1]);
  expect(panels[1]).toHaveAttribute('aria-labelledby','limits');
  expect(screen.getByRole('heading',{name:'Two'})).toHaveAttribute('id','limits');
});
