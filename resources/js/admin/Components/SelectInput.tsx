import React, {forwardRef, useEffect, useRef} from 'react';

type TextInputProps = {
    isFocused?: boolean
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
} & React.HTMLProps<HTMLSelectElement>

export default forwardRef<HTMLSelectElement, TextInputProps>(function textInput(
    props,
    ref
) {
    const input = ref ? ref : useRef<HTMLSelectElement | null>(null);

    const {
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        disabled,
        children,
    } = props;

    useEffect(() => {
        if (isFocused && typeof input !== 'function') {
            input.current?.focus();
        }
    }, []);

    return (
        <select
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-sm shadow-sm mt-1 ` +
                className
            }
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => !!handleChange && handleChange(e)}
            disabled={disabled}
        >
            {children}
        </select>
    );
});
