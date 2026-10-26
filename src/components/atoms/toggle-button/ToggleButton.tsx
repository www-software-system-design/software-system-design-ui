'use client';
import { Button, type ButtonProps } from '../button/index.js';
import { useControllableState } from '../../../hooks/index.js';
export interface ToggleButtonProps extends Omit<ButtonProps, 'aria-pressed'> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: ((pressed: boolean) => void) | undefined;
}
export function ToggleButton({ pressed, defaultPressed = false, onPressedChange, onClick, ...props }: ToggleButtonProps) {
    const [active, setActive] = useControllableState({ value: pressed, defaultValue: defaultPressed, onValueChange: onPressedChange });
    return <Button {...props} aria-pressed={active} onClick={event => {
            onClick?.(event);
            if (!event.defaultPrevented)
                setActive(!active);
        }}/>;
}
