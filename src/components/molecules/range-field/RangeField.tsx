'use client';
import { NativeField, type NativeFieldProps } from '../native-field/index.js';
export type RangeFieldProps = Omit<NativeFieldProps, 'type'>;
export function RangeField({ className, ...props }: RangeFieldProps) {
    return <NativeField {...props} type='range' className={['ssd-range', className].filter(Boolean).join(' ')}/>;
}
