import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ExplorerLayout } from './ExplorerLayout.js';
import { Button } from '../../atoms/button/Button.js';

describe('ExplorerLayout', () => {
  it('composes named content and sidebar slots without introducing a nested main', () => {
    render(<main><ExplorerLayout header={<h1>Library</h1>} toolbar={<p>Tools</p>} sidebar={<p>Filters</p>} sidebarLabel="Filter options" contentLabel="Component explorer" footer={<p>Help</p>}><p>Results</p></ExplorerLayout></main>);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('complementary', { name: 'Filter options' })).toHaveTextContent('Filters');
    expect(screen.getByRole('region', { name: 'Component explorer' })).toHaveTextContent('Results');
    expect(screen.getByRole('heading', { name: 'Library', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('omits optional regions and accepts localized content labels', () => {
    render(<ExplorerLayout header={<h1>المكتبة</h1>} contentLabel="المكونات"><p>النتائج</p></ExplorerLayout>);
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'المكونات' })).toHaveTextContent('النتائج');
  });

  it('preserves consumer state when layout slots update', async () => {
    function ConsumerState() {
      const [count, setCount] = useState(0);
      return <Button onClick={() => setCount((value) => value + 1)}>Count {count}</Button>;
    }
    const { rerender } = render(<ExplorerLayout header="First header" contentLabel="Content"><ConsumerState /></ExplorerLayout>);
    await userEvent.click(screen.getByRole('button', { name: 'Count 0' }));
    rerender(<ExplorerLayout header="Updated header" contentLabel="Content" footer="Footer"><ConsumerState /></ExplorerLayout>);
    expect(screen.getByRole('button', { name: 'Count 1' })).toBeInTheDocument();
  });
});
