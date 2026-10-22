import type { ReactNode } from 'react';
import '@software-system.design/ui/styles.css';

export const metadata = { title: 'UI package consumer fixture' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
