import React, {forwardRef, useEffect, useRef} from 'react';

type TextAreaInputProps = {
    id?: string
    name?: string
    type?: string
    value?: string
    autoComplete?: string
    required?: boolean
    isFocused?: boolean
    handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    readOnly?: boolean
} & React.HTMLProps<HTMLTextAreaElement>

export default forwardRef<HTMLTextAreaElement, TextAreaInputProps>(function textAreaInput(
    props,
    ref
) {
    const input = ref ? ref : useRef<HTMLTextAreaElement | null>(null);

    const {
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        readOnly,
        placeholder,
    } = props;

    useEffect(() => {
        if (isFocused && typeof input !== 'function') {
            input.current?.focus();
        }
    }, []);

    return (
        <textarea
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-sm shadow-sm h-[150px] ` +
                className
            }
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => !!handleChange && handleChange(e)}
            readOnly={readOnly}
            placeholder={placeholder}
        />
    );
});
