import React from "react";
import PropTypes from "prop-types";
import { Input, Icon, Label } from "semantic-ui-react";
import "./FormFields.css";

const TextInput = ({
  name,
  onChange,
  onBlur,
  placeholder,
  style,
  valid,
  type,
  id,
  showPassword = false,
  toggleShowPassword,
  maxLength,
  defaultValue,
  error = {},
  action,
  className,
}) => {
  let errorId = `error-${error.type}`;
  return (
    <>
      <div>
        <Input
          id={id}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          style={style}
          type={type}
          action={action}
          defaultValue={defaultValue}
          maxLength={maxLength}
          className={
            error.message ? `input-error ${className}` : `${className}`
          }
          aria-invalid={error.message ? "true" : "false"}
          aria-describedby="error-required error-pattern error-min"
          icon={
            error.message ? (
              <Icon name="times circle" className="form-field-invalid-icon" />
            ) : valid ? (
              <Icon name="check circle" className="form-field-valid-icon" />
            ) : name === "password" && !showPassword ? (
              <Icon
                style={{
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleShowPassword();
                }}
                name="eye"
              />
            ) : name === "password" && showPassword ? (
              <Icon
                style={{
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleShowPassword();
                }}
                name="eye slash outline"
              />
            ) : (
              <></>
            )
          }
        />
        {}
      </div>

      <div className={"error-wrapper"}>
        {error.type && (
          <Label pointing id={errorId} className="label-error">
            {error.message}
          </Label>
        )}
      </div>
    </>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  valid: PropTypes.bool,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  error: PropTypes.object,
  showPassword: PropTypes.bool,
  toggleShowPassword: PropTypes.func,
  maxLength: PropTypes.string,
  defaultValue: PropTypes.string,
  action: PropTypes.object,
  className: PropTypes.string,
};

export default TextInput;
