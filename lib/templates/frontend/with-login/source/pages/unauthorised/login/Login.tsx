import React, { FC } from 'react';
import { Form } from 'react-final-form';
import validator from 'validator';

import { FORM_ERROR } from 'final-form';

import { Modal } from 'components/common';
import { Input, Button } from 'components/forms';

import { useUserActions } from 'store/user';

const formSubscription = {
  invalid: true,
  submitting: true,
  submitFailed: true,
  dirtySinceLastSubmit: true,
  submitError: true,
};

const emailValidators = [
  (value?: string) => {
    if (!value || !value.trim()) {
      return 'Email address is required';
    }

    if (!validator.isEmail(value.trim())) {
      return 'Email address is in a wrong format';
    }
  },
];

const passwordValidators = [
  (value?: string) => {
    if (!value || !value.trim()) {
      return 'Password is required';
    }
  },
];

export const LoginPage: FC = () => {
  const userActions = useUserActions();

  const onSubmit = async (values: any) => {
    const error = await userActions.login(values.email, values.password);

    if (error) {
      console.error(error);

      return { [FORM_ERROR]: error.message };
    }
  };

  return (
    <Form onSubmit={ onSubmit } subscription={ formSubscription }>
      { ({ handleSubmit, invalid, submitting, dirtySinceLastSubmit, submitError, submitFailed }) => (
        <Modal
          isOpen
          isClosable={ false }
          isLoading={ submitting }
          error={ !dirtySinceLastSubmit && submitError }
          className="login-page"
          heading="Please enter your login details below:"
        >
          <form onSubmit={ handleSubmit } noValidate>
            <Input
              name="email"
              type="email"
              label="Email"
              validators={ emailValidators }
              className="input-wrapper"
            />

            <Input
              name="password"
              type="password"
              label="Password"
              validators={ passwordValidators }
              className="input-wrapper"
            />

            <Button
              className="login-button"
              disabled={ invalid && (!submitFailed || !dirtySinceLastSubmit) }
            >
              Login
            </Button>
          </form>
        </Modal>
      ) }
    </Form>
  );
};
