import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginForm } from "../forms";
import logo from "../../assets/padlock.png";
import Error from "../common/error/Error";
export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [credentialError, setCredentialError] = useState(false);
  const { setOpen, setMessage, modal } = Error();
  const history = useHistory();

  function onSubmit() {
    setMessage("There has been an error, as submit isnt connected");
    setOpen(true);
  }

  function register() {
    history.push("/register");
  }
  return (
    <div className="App-background-container">
      {modal}
      <div className="App-form-container">
        <img src={logo} className="App-image-size-big App-image-position" />
        <LoginForm
          onSubmit={onSubmit}
          submitting={submitting}
          credentialError={credentialError}
          setCredentialError={setCredentialError}
        />
        <h2 onClick={register} className="login-links">
          Register for an account
        </h2>
      </div>
    </div>
  );
}
