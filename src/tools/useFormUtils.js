import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
export default function useFormUtils(
  validFormFields = [],
  defaultValues = {},
  dynamicFormFields = {},
  updateUseEffect = []
) {
  const [isVisible, setIsVisible] = useState(dynamicFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [formFieldValues, setFormFieldValues] = useState(defaultValues);
  const {
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    clearError,
    getValues,
    triggerValidation,
    control,
    reset,
    formState,
    setError,
  } = useForm(defaultValues);

  const registerWrapper = {
    email: () => {
      register(
        { name: "email" },
        {
          required: {
            value: true,
            message: "Please enter an email address",
          },
          pattern: {
            value: /^(?:(?:[\w.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/,
            message: "Please enter a valid email address",
          },
        }
      );
    },
    password: () => {
      register(
        { name: "password" },
        {
          required: { value: true, message: "Please enter a password" },
          pattern: {
            // eslint-disable-next-line no-control-regex
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/,
            message:
              "Please enter a password at least 8 characters long and contains at least one lowercase, uppercase, and special character",
          },
        }
      );
    },
    confirmPassword: () => {
      register(
        { name: "confirmPassword" },
        {
          required: { value: true, message: "Please confirm password" },
          pattern: {
            // eslint-disable-next-line no-control-regex
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/,
            message:
              "Please enter a password at least 8 characters long and contains at least one lowercase, uppercase, and special character",
          },
          validate: {
            equalToPassword: (value) =>
              value === getValues()["password"]
                ? true
                : "The password fields do not match",
          },
        }
      );
    },
    firstName: () => {
      register(
        { name: "firstName" },
        {
          required: { value: true, message: "Please enter a first name" },
        }
      );
    },
    lastName: () => {
      register(
        { name: "lastName" },
        {
          required: { value: true, message: "Please enter a last name" },
        }
      );
    },
  };

  useEffect(() => {
    if (!validFormFields.length) return;
    reset();
    if (Object.keys(dynamicFormFields).length) {
      validFormFields.forEach((key) => {
        if (dynamicFormFields[key] !== false) {
          registerWrapper[key]();
        }
        // dynamicFormFields[key] === false ? null : registerWrapper[key]();
      });
    } else {
      validFormFields.forEach((key) => {
        registerWrapper[key]();
      });
    }
    return () => {
      unregister(validFormFields);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, updateUseEffect);

  // need to do work on validation, making the correct icons appear
  function onChange(event, { name, value }) {
    const { target } = event;
    if (target.parentNode.childNodes[1]) {
      target.parentNode.childNodes[1].style = "visibility: hidden";
    }
    setValue(name, value);

    if (errors[name]) {
      clearError(name);
    }
  }

  async function validate(event) {
    const { target } = event;
    const { name } = target;
    if (target.parentNode.childNodes[1]) {
      target.parentNode.childNodes[1].style = "visibility: visible";
    }
    console.log("triggering validation for", name);
    const valid = await triggerValidation(name);
    console.log("valid", valid);
    console.log("formstate.submitCount", formState.submitCount);
    if (valid && formState.submitCount > 0) {
      //this is to trigger re-render on subsequent uses of form
      clearError(name);
    }
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return {
    isVisible,
    formFieldValues,
    setFormFieldValues,
    setIsVisible,
    onChange,
    togglePassword,
    showPassword,
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    clearError,
    getValues,
    triggerValidation,
    validate,
    reset,
    setError,
    control,
    formState,
  };
}
