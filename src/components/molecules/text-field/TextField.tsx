"use client";

import { useId, type ReactNode } from "react";
import {
  TextInput,
  type TextInputProps,
} from "../../atoms/text-input/index.js";
export interface TextFieldProps extends TextInputProps {
  label: ReactNode;
  description?: string;
  error?: string;
  wrapperClassName?: string;
}
/** Native input props and ref address the input; wrapperClassName addresses the field. */
export function TextField({
  label,
  description,
  error,
  id,
  wrapperClassName,
  ...props
}: TextFieldProps) {
  const generated = useId();
  const inputId = id ?? "ssd-field-" + generated;
  const descriptionId = inputId + "-description";
  const errorId = inputId + "-error";
  return (
    <div
      className={["ssd-text-field", wrapperClassName].filter(Boolean).join(" ")}
    >
      <label className="ssd-field-label" htmlFor={inputId}>
        {label}
      </label>
      <TextInput
        {...props}
        id={inputId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={
          [
            props["aria-describedby"],
            description && descriptionId,
            error && errorId,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
      />
      {description && (
        <p id={descriptionId} className="ssd-field-description">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="ssd-field-error">
          {error}
        </p>
      )}
    </div>
  );
}
