import React, { useState, useContext } from 'react';

import { Input } from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/useForm';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import { AuthContext } from '../../context/auth-context';

import './Auth.css';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((previousState) => !previousState);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );

        login(responseData.message.id);
      } catch (error) {}
    } else {
      try {
        await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );

        login();
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="auth-card">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Log in</h2>
        <hr />
        <form onSubmit={loginHandler}>
          {!isLogin && (
            <Input
              id="name"
              element="input"
              type="name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              placeholder="name..."
              label="Your name"
              errorText="Please enter a valid name"
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            placeholder="email address..."
            label="Your email"
            errorText="Please enter a valid email address"
          />
          <Input
            id="password"
            element="input"
            type="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            placeholder="password..."
            label="Your password"
            errorText="The password must be at least 5 characters long"
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
