import React, { useState } from "react";
import { TextInput } from "../common";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import FormUtils from "../../tools/useFormUtils";

export default function RegisterForm({
  onSubmit,
  submitting = false,
  credentialError,
  setCredentialError,
}) {
  const form = FormUtils(["email", "password", "confirmPassword"]);
  const formValues = form.getValues();

  function changeWrapper(event, { name, value }) {
    form.onChange(event, { name, value });
    setCredentialError(false);
  }

  function toggleShowPassword() {
    // const element = document.getElementById("login-form-password");
    // if (element.getAttribute("type") === "password") {
    //   element.setAttribute("type", "text");
    // } else {
    //   element.setAttribute("type", "password");
    // }
    // form.togglePassword();
    const elements = document.querySelectorAll("input[type='password']");
    elements.forEach((element) =>
      element.getAttribute("type") === "password"
        ? element.setAttribute("type", "text")
        : element.setAttribute("type", "password")
    );
    form.togglePassword();
  }
  console.log("form.errors", form.errors);
  return (
    <div>
      <h2 className="title-color">Register for an account</h2>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field>
          <label>EMAIL</label>
          <TextInput
            name="email"
            onChange={changeWrapper}
            onBlur={form.validate}
            placeholder="Email"
            error={form.errors.email}
            valid={
              formValues["email"] && form.errors.email === undefined
                ? true
                : false
            }
            type="email"
          />
        </Form.Field>
        <Form.Field>
          <label>PASSWORD</label>
          <TextInput
            id="register-form-password"
            name="password"
            onChange={changeWrapper}
            onBlur={form.validate}
            placeholder="Password"
            error={form.errors.password}
            valid={
              formValues["password"] && form.errors.password === undefined
                ? true
                : false
            }
            toggleShowPassword={toggleShowPassword}
            showPassword={form.showPassword}
            type="password"
          />
        </Form.Field>
        <Form.Field>
          <label>CONFIRM PASSWORD</label>
          <TextInput
            id="register-form-confirm-password"
            name="confirmPassword"
            onChange={changeWrapper}
            onBlur={form.validate}
            placeholder="Confirm Password"
            error={form.errors.confirmPassword}
            valid={
              formValues["confirmPassword"] &&
              form.errors.confirmPassword === undefined
                ? true
                : false
            }
            toggleShowPassword={toggleShowPassword}
            showPassword={form.showPassword}
            type="password"
          />
        </Form.Field>

        <Button
          secondary
          type="submit"
          loading={submitting}
          style={{
            width: "100%",
            marginTop: "25px",
          }}
        >
          REGISTER
        </Button>
        <div
          style={{
            visibility: credentialError ? "visible" : "hidden",
            color: "rgb(255, 179, 176)",
            marginTop: "5px",
          }}
        >
          The credentials you've entered are not available.
        </div>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  credentialError: PropTypes.bool.isRequired,
  setCredentialError: PropTypes.func.isRequired,
};
