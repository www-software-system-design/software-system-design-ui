import { readFileSync } from 'node:fs';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

let stylesheet: HTMLStyleElement;
beforeEach(() => {
  stylesheet = document.createElement('style');
  stylesheet.textContent = readFileSync('src/tokens/tokens.css', 'utf8');
  document.head.append(stylesheet);
});
afterEach(() => stylesheet.remove());

// WCAG relative luminance: independent palette constraints, not color snapshots.
function luminance(hex: string): number {
  expect(hex).toMatch(/^#[\da-f]{6}$/i);
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
}

function contrast(first: string, second: string): number {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe.each(['light', 'dark'])('%s semantic tokens', (theme) => {
  it('meets AA contrast for active text, muted text, errors, and actions', () => {
    const { container } = render(<div data-ssd-theme={theme} />);
    const style = getComputedStyle(container.firstElementChild!);
    const color = (name: string) => style.getPropertyValue(`--ssd-color-${name}`).trim();
    for (const name of ['text', 'muted', 'danger']) {
      expect(contrast(color(name), color('surface'))).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(color('on-action'), color('action'))).toBeGreaterThanOrEqual(4.5);
  });

  it('provides distinguishable control boundaries and focus indicators', () => {
    const { container } = render(<div data-ssd-theme={theme} />);
    const style = getComputedStyle(container.firstElementChild!);
    const color = (name: string) => style.getPropertyValue(`--ssd-color-${name}`).trim();
    expect(contrast(color('border'), color('surface'))).toBeGreaterThanOrEqual(3);
    expect(contrast(color('focus'), color('surface'))).toBeGreaterThanOrEqual(3);
  });
});
