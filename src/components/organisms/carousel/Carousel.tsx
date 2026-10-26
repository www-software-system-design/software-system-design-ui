'use client';
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '../../atoms/button/index.js';
import { useControllableState } from '../../../hooks/use-controllable-state/index.js';
export interface CarouselSlide { id: string; label: string; content: ReactNode; }
export interface CarouselLabels { previous: string; next: string; pause: string; resume: string; indicators: string; carousel: string; slide: string; }
export interface CarouselProps extends Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'aria-label'> {
  label: string;
  labels: CarouselLabels;
  slides: readonly CarouselSlide[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Opt-in automatic rotation in milliseconds. Omit to keep manual navigation. */
  interval?: number;
  /** Consumer-owned presentation or visibility state can suspend rotation. */
  suspended?: boolean;
}
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function reducedMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
export function Carousel({ label, labels, slides, index, defaultIndex = 0, onIndexChange, interval, suspended = false, className, onFocusCapture, onMouseEnter, onMouseLeave, ...props }: CarouselProps) {
  const [selected, select] = useControllableState({ value: index, defaultValue: defaultIndex, onValueChange: onIndexChange });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotion, () => true);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const id = useId();
  const current = Number.isInteger(selected) && selected >= 0 && selected < slides.length ? selected : 0;
  const automatic = interval !== undefined && Number.isFinite(interval) && interval > 0 && slides.length > 1;
  const rotating = automatic && !paused && !hovered && !reduced && !suspended;
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      const element = root.current;
      if (!element || element.ownerDocument.hidden) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.height <= 0 || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      select((current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [rotating, interval, current, slides.length, select]);
  if (!slides.length) return null;
  const choose = (next: number) => { setPaused(true); select(next); };
  return <section {...props} ref={root} aria-label={label} aria-roledescription={labels.carousel} className={['ssd-carousel', className].filter(Boolean).join(' ')}
    onMouseEnter={event => { onMouseEnter?.(event); setHovered(true); }} onMouseLeave={event => { onMouseLeave?.(event); setHovered(false); }}
    onFocusCapture={event => { onFocusCapture?.(event); if (!toggle.current?.contains(event.target)) setPaused(true); }}>
    {slides.length > 1 && <div className='ssd-carousel__controls'>
      {automatic && <Button ref={toggle} variant='secondary' disabled={reduced || suspended} onClick={() => setPaused(value => !value)}>{paused ? labels.resume : labels.pause}</Button>}
      <Button variant='secondary' onClick={() => choose((current + slides.length - 1) % slides.length)}>{labels.previous}</Button>
      <Button variant='secondary' onClick={() => choose((current + 1) % slides.length)}>{labels.next}</Button>
      <div role='group' aria-label={labels.indicators} className='ssd-carousel__indicators'>{slides.map((slide, position) =>
        <Button key={slide.id} variant='secondary' aria-controls={id + '-' + slide.id} aria-current={position === current ? 'true' : undefined} onClick={() => choose(position)}>{slide.label}</Button>
      )}</div>
    </div>}
    <div className='ssd-carousel__panels' aria-live={rotating ? 'off' : 'polite'} aria-atomic='false'>{slides.map((slide, position) =>
      <div key={slide.id} id={id + '-' + slide.id} role='group' aria-roledescription={labels.slide} aria-label={slide.label} hidden={position !== current} inert={position !== current}>{slide.content}</div>
    )}</div>
  </section>;
}
