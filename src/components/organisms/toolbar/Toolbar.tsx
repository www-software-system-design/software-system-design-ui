'use client';

import {useEffect,useImperativeHandle,useRef,type ComponentPropsWithRef} from 'react';
import {useUI} from '../../../providers/index.js';

export interface ToolbarProps extends ComponentPropsWithRef<'div'> {
  label: string;
  orientation?: 'horizontal'|'vertical';
}

const buttonSelector='button:not(:disabled):not([aria-disabled="true"])';

export function Toolbar({label,orientation='horizontal',children,className,onKeyDown,onFocus,ref,...props}:ToolbarProps){
  const root=useRef<HTMLDivElement>(null);
  const {direction}=useUI();
  useImperativeHandle(ref,()=>root.current!,[]);
  useEffect(()=>{
    const buttons=Array.from(root.current?.querySelectorAll<HTMLButtonElement>(buttonSelector)??[]);
    const active=buttons.find(button=>button===button.ownerDocument.activeElement)??buttons[0];
    buttons.forEach(button=>{button.tabIndex=button===active?0:-1;});
  },[children]);

  return <div {...props} ref={root} role="toolbar" aria-label={label} aria-orientation={orientation}
    className={['ssd-toolbar',className].filter(Boolean).join(' ')}
    onFocus={event=>{
      onFocus?.(event);
      const target=(event.target as Element).closest<HTMLButtonElement>('button');
      const buttons=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>(buttonSelector));
      if(target&&buttons.includes(target))buttons.forEach(button=>{button.tabIndex=button===target?0:-1;});
    }}
    onKeyDown={event=>{
      onKeyDown?.(event);
      if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey)return;
      const target=(event.target as Element).closest<HTMLButtonElement>('button');
      const buttons=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>(buttonSelector));
      const index=target?buttons.indexOf(target):-1;
      if(index<0)return;
      const forward=orientation==='vertical'?'ArrowDown':direction==='rtl'?'ArrowLeft':'ArrowRight';
      const backward=orientation==='vertical'?'ArrowUp':direction==='rtl'?'ArrowRight':'ArrowLeft';
      let next:HTMLButtonElement|undefined;
      if(event.key==='Home')next=buttons[0];
      else if(event.key==='End')next=buttons.at(-1);
      else if(event.key===forward)next=buttons[(index+1)%buttons.length];
      else if(event.key===backward)next=buttons[(index-1+buttons.length)%buttons.length];
      if(next){
        event.preventDefault();
        buttons.forEach(button=>{button.tabIndex=button===next?0:-1;});
        next.focus();
      }
    }}>{children}</div>;
}
