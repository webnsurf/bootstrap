import React, { FC, useMemo, memo } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import classnames from 'classnames';
import AntInput, { InputProps as AntInputProps } from 'antd/lib/input';
import 'antd/lib/input/style';

import { Modify } from 'utils/ts';

import { Message } from 'components/common';

const InputRenderer: FC<InputRendererProps> = ({
  meta: { error, touched },
  input,
  label,
  onChange,
  placeholder,
  className: passedClassName,
  ...rest
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

  const Component = input.type === 'password'
    ? AntInput.Password
    : AntInput;

  return (
    <div className={ className }>
      { label && <label className="label" htmlFor={ randomId }>{ label }</label> }

      <Component
        id={ randomId }
        onChange={ event => {
          if (onChange) {
            onChange(event.target.value);
          }

          input.onChange(event);
        } }
        placeholder={ placeholder }
        { ...input }
        { ...rest }
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

interface CustomInputProps {
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

export type InputProps = Modify<
    Omit<AntInputProps, 'value'>,
    CustomInputProps
>
