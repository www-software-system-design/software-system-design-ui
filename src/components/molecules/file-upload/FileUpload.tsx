'use client';
import { NativeField, type NativeFieldProps } from '../native-field/index.js';
export type FileUploadProps = Omit<NativeFieldProps, 'type' | 'value' | 'defaultValue'>;
export function FileUpload(props: FileUploadProps) {
    return <NativeField {...props} type='file'/>;
}
