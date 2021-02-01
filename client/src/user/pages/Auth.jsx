import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const { isLoading, error, sendRequest } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const resData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/user/authenticate`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(resData.user, resData.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin - IK's Blog</title>
      </Helmet>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Authenticate</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            errorText="Username must be more than 3 characters"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(8),
              VALIDATOR_MAXLENGTH(25),
            ]}
            errorText="Password must be between 8-25 characters"
            onInput={inputHandler}
          />
          <p>{error}</p>
          <p>{message}</p>
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Auth;
