import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion.js';
it('labels native independent disclosures without a global group name', async () => { render(<Accordion label='Questions' items={[{ id: 'one', title: 'Question one', content: 'Answer one' }, { id: 'two', title: 'Question two', content: 'Answer two' }]}/>); const summary = screen.getByText('Question one'); await userEvent.click(summary); expect(screen.getByText('Answer one')).toBeVisible(); expect(screen.getByText('Answer two')).not.toBeVisible(); });
