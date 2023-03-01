import React, {forwardRef, useEffect, useRef} from 'react';

type TextInputProps = {
    id?: string
    name?: string
    type?: string
    value?: string | number
    autoComplete?: string
    required?: boolean
    isFocused?: boolean
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    readOnly?: boolean
} & React.HTMLProps<HTMLInputElement>

export default forwardRef<HTMLInputElement, TextInputProps>(function textInput(
    props,
    ref
) {
    const input = ref ? ref : useRef<HTMLInputElement | null>(null);

    const {
        type = 'text',
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        readOnly,
        disabled,
        step,
        min,
        max,
        placeholder,
    } = props;

    useEffect(() => {
        if (isFocused && typeof input !== 'function') {
            input.current?.focus();
        }
    }, []);

    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-sm shadow-sm disabled:bg-gray-300 ` +
                (className ? className : '')
            }
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => !!handleChange && handleChange(e)}
            readOnly={readOnly}
            disabled={disabled}
            step={step}
            min={min}
            max={max}
            placeholder={placeholder}
        />
    );
});
