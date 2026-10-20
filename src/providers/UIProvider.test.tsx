import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UIProvider, useUI } from './UIProvider.js';

function Probe({ name }: { name: string }) {
  const { locale, direction, messages } = useUI();
  return <output aria-label={name}>{`${locale}|${direction}|${messages.loading}`}</output>;
}

describe('UIProvider', () => {
  it('works without a provider', () => {
    render(<Probe name="default" />);
    expect(screen.getByLabelText('default')).toHaveTextContent('en|ltr|Loading');
  });

  it('isolates sibling roots and inherits nested configuration', () => {
    render(<>
      <UIProvider locale="ar" direction="rtl" theme="dark" messages={{ loading: 'انتظر' }}>
        <Probe name="parent" />
        <UIProvider theme="light"><Probe name="nested" /></UIProvider>
      </UIProvider>
      <UIProvider><Probe name="sibling" /></UIProvider>
    </>);
    expect(screen.getByLabelText('parent')).toHaveTextContent('ar|rtl|انتظر');
    expect(screen.getByLabelText('nested')).toHaveTextContent('ar|rtl|انتظر');
    expect(screen.getByLabelText('sibling')).toHaveTextContent('en|ltr|Loading');
    expect(screen.getByLabelText('parent').closest('[data-ssd-theme]')).toHaveAttribute('data-ssd-theme', 'dark');
    expect(screen.getByLabelText('nested').closest('[data-ssd-theme]')).toHaveAttribute('data-ssd-theme', 'light');
  });

  it('updates explicit theme and retains default messages for missing overrides', () => {
    const { rerender } = render(<UIProvider theme="system"><Probe name="scope" /></UIProvider>);
    expect(screen.getByLabelText('scope').closest('[data-ssd-theme]')).toHaveAttribute('data-ssd-theme', 'system');
    rerender(<UIProvider theme="dark" locale="fr"><Probe name="scope" /></UIProvider>);
    expect(screen.getByLabelText('scope')).toHaveTextContent('fr|ltr|Loading');
    expect(screen.getByLabelText('scope').closest('[data-ssd-theme]')).toHaveAttribute('data-ssd-theme', 'dark');
  });
});
