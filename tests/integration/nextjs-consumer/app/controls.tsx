'use client';

import { useState } from 'react';
import { Button } from 'component-lib/button';

export function Controls() {
  const [count, setCount] = useState(0);
  return <section aria-label="Client state">
    <Button onClick={() => setCount((value) => value + 1)}>Increment</Button>
    <output aria-label="Count">{count}</output>
  </section>;
}
