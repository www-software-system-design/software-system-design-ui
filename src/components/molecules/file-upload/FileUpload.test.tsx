import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FileUpload } from './FileUpload.js';
it('exposes native files without uploading or persisting them', async () => { const change = vi.fn(); render(<FileUpload label='Attachment' accept='.txt' onChange={change}/>); const file = new File(['hello'], 'hello.txt', { type: 'text/plain' }); await userEvent.upload(screen.getByLabelText('Attachment'), file); expect((screen.getByLabelText('Attachment') as HTMLInputElement).files?.[0]).toBe(file); expect(change).toHaveBeenCalledOnce(); });
