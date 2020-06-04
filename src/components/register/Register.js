import React, { useState } from "react";
import { Error } from "../common";
import { useHistory } from "react-router-dom";
import logo from "../../assets/register.png";
import { RegisterForm } from "../forms";

export default function Register() {
  const [submitting, setSubmitting] = useState(false);
  const [credentialError, setCredentialError] = useState(false);
  const { setOpen, setMessage, modal } = Error();
  const history = useHistory();

  function onSubmit() {}

  function backToLogin() {
    history.push("/login");
  }

  return (
    <div className="App-background-container">
      {modal}
      <div className="App-form-container">
        <img
          src={logo}
          className="App-image-size-big App-image-position"
          alt="Please register"
        />
        <RegisterForm
          onSubmit={onSubmit}
          submitting={submitting}
          credentialError={credentialError}
          setCredentialError={setCredentialError}
        />
        <h2 onClick={backToLogin} className="login-links">
          Already have an account?
        </h2>
      </div>
    </div>
  );
}
