import React, { FC, useMemo, memo } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import classnames from 'classnames';

import { Message } from 'components/common';

const InputRenderer: FC<InputRendererProps> = ({
  meta: { error, touched },
  input,
  label,
  onChange,
  placeholder,
  className: passedClassName,
}) => {
  const { name } = input;
  const randomId = useMemo(() => (
    `input-${name}-${Math.floor(Math.random() * 10000)}`
  ), [name]);

  const errorMessage = touched && error;
  const className = classnames(
    'input',
    errorMessage ? 'has-error' : 'no-error',
    passedClassName,
  );

  return (
    <div className={ className }>
      { label && <label className="label" htmlFor={ randomId }>{ label }</label> }

      <input
        id={ randomId }
        placeholder={ placeholder }
        { ...input }
        onChange={ event => {
          if (onChange) {
            onChange(event.target.value);
          }

          input.onChange(event);
        } }
      />

      <Message
        message={ errorMessage }
        isOpen={ !!errorMessage }
        marginTop={ 5 }
        simple
      />
    </div>
  );
};

export const Input: FC<InputProps> = memo(({
  name,
  type = 'text',
  defaultValue,
  validators,
  ...rest
}) => {
  const validator = (val: string) => (
    validators && validators.reduce(
      (error, validate) => error || validate(val),
      undefined,
    )
  );

  return (
    <Field
      name={ name }
      type={ type }
      initialValue={ defaultValue }
      render={ InputRenderer }
      validate={ validator }
      { ... rest }
    />
  );
});

export interface InputProps {
  name: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'time' | 'number' | 'email' | 'password';
  defaultValue?: string;
  validators?: ((value: string) => any)[];
  label?: string;
  placeholder?: string;
  className?: string;
}

interface InputRendererProps extends
  FieldRenderProps<string, HTMLInputElement>,
  Omit<InputProps, 'name'> {
}
