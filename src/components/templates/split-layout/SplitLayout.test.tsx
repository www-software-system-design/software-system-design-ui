import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { SplitLayout } from './SplitLayout.js';
it('preserves primary then secondary reading order without adding landmarks', () => {
  const ref = {current:null};
  render(<SplitLayout ref={ref} secondary={<p>Evidence</p>} dir="rtl"><h2>Context</h2></SplitLayout>);
  expect(ref.current).toHaveTextContent('ContextEvidence');
  expect(ref.current).toHaveAttribute('dir','rtl');
  expect(screen.queryByRole('main')).not.toBeInTheDocument();
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});
