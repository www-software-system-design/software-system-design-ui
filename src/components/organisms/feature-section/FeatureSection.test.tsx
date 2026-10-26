import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { FeatureSection } from './FeatureSection.js';
it('composes a named section, heading depth, cards and footer slots', () => {
 render(<FeatureSection title='Shared contracts' headingLevel={1} description='Work together' footer={<a href='/contribute'>Contribute</a>}><article>Consumer card</article></FeatureSection>);
 const heading = screen.getByRole('heading', { level: 1, name: 'Shared contracts' });
 expect(screen.getByRole('region', { name: 'Shared contracts' })).toHaveAttribute('aria-labelledby', heading.id);
 expect(screen.getByRole('article')).toBeVisible();
 expect(screen.getByRole('link', { name: 'Contribute' })).toHaveAttribute('href', '/contribute');
});
